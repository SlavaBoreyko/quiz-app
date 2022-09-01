import React, { FC } from 'react';
import s from './ButtonPlay.module.scss';
import playIcon from '../../../assets/svg/playIcon.svg';

export interface ButtonPlayProps {
    width?: string;
    // onClick:
}

const ButtonPlay: FC<ButtonPlayProps> = ({
  width
}) => {
  (width) && document.documentElement.style.setProperty('--sizeBtnPlay', `${width}`);
  return (
    <button className={s.btn}>
      <div className={s.circularProgress} >
        <img className={s.icon} src={playIcon} alt='icon' />
      </div>
    </button>
  );
};

export default ButtonPlay;