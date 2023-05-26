import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import s from './CircleBar.module.scss';

export interface CircleBarProps {
  resultPoints?: number;
  openAndLock?: string;
  width?: number;
  fontSize?: string;
  setShowResult?: Dispatch<SetStateAction<boolean>>;
}

const CircleBar: FC<CircleBarProps> = ({
  resultPoints, 
  openAndLock,
  width = 50, 
  fontSize, 
  setShowResult, 
}) => {

  // (width) && 
  document.documentElement.style.setProperty('--size', `${width}rem`);
  const refProgressBar = useRef<HTMLDivElement>(null);
  const refValueContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refValueContainer.current) {
      if (fontSize) {
        refValueContainer.current.style.fontSize = fontSize;
      } else if(!fontSize && width) {
        const fontSizebyWidth = width*8;
        refValueContainer.current.style.fontSize = `${fontSizebyWidth}%`;
      } 
    }
  }, [refValueContainer.current]);

  let speed = 20;
  let progressValue = 0;
  // let progressEndValue: number;
  const [progressEndValue, setProgressEndValue] = useState<number | undefined>(undefined);
  // Limited to 100% if resultPoints calculated the wrong way 
  useEffect(() => {
    if(resultPoints && resultPoints <= 0 ) {
      setProgressEndValue(0);
    } else if(resultPoints && resultPoints < 100) {
      setProgressEndValue(resultPoints);
    } else if (resultPoints && resultPoints > 100) {
      setProgressEndValue(100); 
    }
  }, [resultPoints]);
    
    
  if(resultPoints !== 0 && progressEndValue) {
    let progress = setInterval(() => { 
      progressValue++;
      (refValueContainer.current) && (
        refValueContainer.current.textContent = `${progressValue}%`
      );
      (refProgressBar.current) && (
        refProgressBar.current.style.background = `conic-gradient(
                        #F59F00 ${progressValue * 3.6}deg,
                        #343a40  ${progressValue * 3.6}deg
                    )`
      );
      if (progressValue === progressEndValue) {
        (setShowResult) && setShowResult(true);
        clearInterval(progress);
      }
    }, speed);
  }

  useEffect(() => {
    if(openAndLock && openAndLock !== '') {
      const percentageOpenPics = 100*(+(openAndLock.split('/')[0]) / +(openAndLock.split('/')[1]));
      (refValueContainer.current) && (
        refValueContainer.current.textContent = `${openAndLock}`
      );
      (refProgressBar.current) && (
        refProgressBar.current.style.background = `conic-gradient(
                        #F59F00 ${percentageOpenPics * 3.6}deg,
                        #343a40  ${percentageOpenPics * 3.6}deg
                    )`
      );
    }
  }, [openAndLock]);


  return (
    <>
      <div className={s.circularProgress} ref={refProgressBar}>
        <div className={s.valueContainer} 
          ref={refValueContainer}>
                0
        </div>
      </div>
    </>
  );
};

export default React.memo(CircleBar);
// export default CircleBar;