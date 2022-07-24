import React, { FC } from 'react';
import s from './ButtonNav.module.scss';

export interface ButtonProps {
  caption: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonNav: FC<ButtonProps> = ({caption, onClick}) => {
  return (
    <button className={s.transparentBtn} onClick={onClick}>{caption}</button>
  )
}

export default ButtonNav;