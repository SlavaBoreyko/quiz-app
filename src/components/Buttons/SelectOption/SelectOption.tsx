import React, { FC } from 'react';
import { ReactI18NextChild } from 'react-i18next';
import s from './SelectOption.module.scss';



export interface SelectOptionParams {
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    options: {
        // value: ReactI18NextChild | Iterable<ReactI18NextChild>;
        value: string;
        icon: string;
        title: string;
    }[];
    language: string
}

const SelectOption: FC<SelectOptionParams> = ({
    onChange,
    options,
    language
}) => {

  return (
    <select className={s.selectOption} name="language" onChange={onChange} value={language}>
        {   
            options.map((option) => 
                 (<option key={option.value} value={option.value} > 
                 {/* selected={language === option.value}  */}
                    {`${option.icon} ${option.title}`}
                </option>)
            )
        }
    </select>
  )
}

export default SelectOption