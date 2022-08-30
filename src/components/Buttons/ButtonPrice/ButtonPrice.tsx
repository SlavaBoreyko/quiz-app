import React, { FC } from 'react';
import s from './ButtonPrice.module.scss';

export interface ButtonPriceProps {
    width?: string;
    price: string;
    onClick: any;
}

const ButtonPrice: FC<ButtonPriceProps> = ({
  width,
  price,
  onClick,
}) => {
  (width) && document.documentElement.style.setProperty('--sizeBtnPlay', `${width}`);

  return (
    <button className={s.btn} onClick={onClick}>
      <p className={s.goldFont}>{price}</p> 
    </button>
  );
};

export default ButtonPrice;