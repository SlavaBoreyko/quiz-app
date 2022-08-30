import React, { FC } from 'react';
import s from './BtnEmail.module.scss';
import emailIcon from '../../../assets/svg/buttons/email.svg';

export interface BtnEmailProps {
    width?: string;
    // onClick:
}

const BtnEmail: FC<BtnEmailProps> = ({
  width = '22%'
}) => {
  (width) && document.documentElement.style.setProperty('--sizeBtnPlay', `${width}`);
  return (
    <button className={s.btn}>
      <img className={s.icon} src={emailIcon} alt='icon' />
    </button>
  );
};

export default BtnEmail;