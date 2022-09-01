import React, { FC } from 'react';
import s from './BtnRectangle.module.scss';

export interface BtnRectangleProps {
    caption: string;
    onClick: any;
}

const BtnRectangle:FC<BtnRectangleProps> = ({
  caption,
  onClick
}) => (
  <button className={s.btnRectangle} onClick={onClick}>{caption}</button>
);

export default BtnRectangle;