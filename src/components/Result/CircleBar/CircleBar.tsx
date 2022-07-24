import React, { Dispatch, FC, SetStateAction, useRef } from 'react';
import s from './CircleBar.module.scss';

export interface CircleBarProps {
    resultPoints: number;
    width?: number;
    setShowResult?: Dispatch<SetStateAction<boolean>>;
}

const CircleBar: FC<CircleBarProps> = ({
    resultPoints, width, setShowResult, 
}) => {

    (width) && document.documentElement.style.setProperty('--size', `${width}%`);
    const refProgressBar = useRef<HTMLDivElement>(null);
    const refValueContainer = useRef<HTMLDivElement>(null);

    let progressValue = 0;
    let progressEndValue: number;
    // Limited to 100% if resultPoints calculated the wrong way 
    (resultPoints > 100) ? (progressEndValue = 100) : (progressEndValue = resultPoints);
    let speed = 20;

    if(resultPoints !== 0) {
        let progress = setInterval(() => {
            
            progressValue++;
            (refValueContainer.current) && (
                refValueContainer.current.textContent = `${progressValue}%`
            );
            (refProgressBar.current) && (
                refProgressBar.current.style.background = `conic-gradient(
                    #3bc9db ${progressValue * 3.6}deg,
                    #343a40  ${progressValue * 3.6}deg
                   
                )`
            );
            if (progressValue === progressEndValue) {
                (setShowResult) && setShowResult(true)
                clearInterval(progress);
            }

        }, speed);
    }

    return (
    <>
        <div className={s.circularProgress} ref={refProgressBar}>
            <div className={s.valueContainer} ref={refValueContainer}>
                0
            </div>
        </div>
    </>
  )
}

export default React.memo(CircleBar);