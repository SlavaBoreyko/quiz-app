import React, { FC } from 'react';
import s from './ButtonGreyBig.module.scss';

export interface ButtonGreyBigProps {
    icon?: string;
    iconHeight?: string;
    label: string;
    onClick: any;
    active: boolean; 
}

const ButtonGreyBig:FC<ButtonGreyBigProps> = ({
  icon,
  iconHeight,
  label,
  onClick,
  active,
}) => (
  <button className={active ? s.btnActive : s.btnUnactive} onClick={onClick}>
    {(icon) && <img className={s.icon} src={icon} style={{height: iconHeight}}/>}
    <p>{label}</p>
  </button>
);

export default ButtonGreyBig;