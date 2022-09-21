import React, { FC, useEffect, useState } from 'react';
import s from './SelectOption.module.scss';

export interface SelectOptionParams {
    size?: 'big-coin' | 'big' | 'middle' | 'small';
    color?: string;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    options: {
        // value: ReactI18NextChild | Iterable<ReactI18NextChild>;
        value: string;
        icon: string;
        title: string;
    }[];
    selected: string;
}

const SelectOption: FC<SelectOptionParams> = ({
  size = 'small',
  color,
  onChange,
  options,
  selected,
}) => {
  const [selectOptionStyle, setSelectOptionStyle] = useState(s.selectOption);
  const [coinBorderStyle, setCoinBorderStyle] = useState('');

  useEffect(() => {
    switch(size) {
    case 'small': 
      setSelectOptionStyle(s.selectOption);
      break;
    case 'big-coin': 
      setSelectOptionStyle(s.selectOptionBigCoin);
      setCoinBorderStyle(s.coinBorderBig);
      break;
    }
  }, [size]);

  return (
    <div className={coinBorderStyle}>
      <select className={selectOptionStyle} 
        onChange={onChange} 
        value={selected}
        style={color ? { color: `${color}`} : {}}
      >
        {   
          options.map((option, index) => 
            (<option key={index} value={option.value}> 
              {/* selected={language === option.value}  */}
              {option.icon !== '' ? `${option.icon} ${option.title}` :
                `${option.title}`}
            </option>)
          )
        }
      </select>
    </div>
  );};

export default SelectOption;