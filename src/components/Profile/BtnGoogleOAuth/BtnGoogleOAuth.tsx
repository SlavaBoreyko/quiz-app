import React, { Dispatch, FC, SetStateAction, useRef } from 'react';
import s from './BtnGoogleOAuth.module.scss';
import playIcon from '../../../assets/svg/playIcon.svg';
import GLogo from '../../../assets/svg/GoogleLogo.svg'

export interface ButtonPlayProps {
    width?: string;
    // onClick:
}

const BtnGoogleOAuth: FC<ButtonPlayProps> = ({
    width = '24%'
}) => {
    (width) && document.documentElement.style.setProperty('--sizeBtnPlay', `${width}`);
    return (
        <button className={s.btn}>
        <div className={s.circularProgress} >
                <img className={s.icon} src={GLogo} alt='icon' />
        </div>
        </button>
  )
}

export default BtnGoogleOAuth;