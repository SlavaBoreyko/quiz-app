import React, { Dispatch, FC, SetStateAction, useRef } from 'react';
import s from './ButtonPlay.module.scss';
import playIcon from '../../../assets/svg/playIcon.svg';

export interface ButtonPlayProps {
    resultPoints: number;
    width?: number;
    setShowResult?: Dispatch<SetStateAction<boolean>>;
}

const ButtonPlay: FC<ButtonPlayProps> = ({
    resultPoints, width, setShowResult, 
}) => {

    (width) && document.documentElement.style.setProperty('--size', `${width}%`);

    return (
        <button className={s.btn}>
        <div className={s.circularProgress} >
            
            {/* <span>play</span> */}
                <img className={s.icon} src={playIcon} alt='icon' />
        </div>
        </button>
  )
}

export default ButtonPlay;