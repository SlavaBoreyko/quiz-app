import React, { FC } from "react";
import s from './ButtonIcon.module.scss';

export interface ButtonIconProps {
    icon: string;
    onClick: any;
}

const ButtonIcon:FC<ButtonIconProps> = ({
  icon,
  onClick,
}) => (
  <button className={s.btn} onClick={onClick}>
    <img className={s.iconActive} src={icon} alt={'icon'}/>
  </button>
);

export default ButtonIcon;
