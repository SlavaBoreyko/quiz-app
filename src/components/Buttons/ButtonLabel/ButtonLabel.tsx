import React, { FC } from 'react';
import s from './ButtonLabel.module.scss';

export interface ButtonLabelProps {
    label: string;
    onClick: any;
    active: boolean; 
}

const ButtonLabel:FC<ButtonLabelProps> = ({
    label,
    onClick,
    active,
}) => {
  return (
    <button className={active ? s.btnActive : s.btnUnactive} onClick={onClick}>{label}</button>
  )
}

export default ButtonLabel