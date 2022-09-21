import React, { FC, useEffect, useState } from 'react';
import s from './ButtonPrice.module.scss';

export interface ButtonPriceProps {
    width?: string;
    // currency: 'PLN' | 'USD' | string;
    currency:  string;
    onClick: any;
}

const ButtonPrice: FC<ButtonPriceProps> = ({
  width,
  currency,
  onClick,
}) => {
  (width) && document.documentElement.style.setProperty('--sizeBtnPlay', `${width}`);
  const  [currencySymbol, setCurrencySymbol] = useState<'zł' | '$'>('$');

  useEffect(() => {
    switch(currency) {
    case 'PLN': 
      setCurrencySymbol('zł');
      break;
    case 'USD': 
      setCurrencySymbol('$');
      break;
    }
  }, [currency]);


  return (
    <button className={s.btn} onClick={onClick}>
      <p className={s.goldFont}>{currencySymbol}</p> 
    </button>
  );
};

export default ButtonPrice;