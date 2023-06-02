import React, { FC, ReactNode } from 'react';
import s from './RadioInput.module.scss';
import { InputChecked } from '../InputChecked/InputChecked';

export interface RadioInputProps {
  index: number;
  value: number;
  checked: boolean[];
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

const RadioInput: FC<RadioInputProps> = ({
  value,
  index,
  checked,
  handler,
  children,
}) => (
  <div className={s.radioContainer}>
    <label htmlFor={`${index}`}>
      <input
        className={s.textContainer}
        type="radio"
        id={`${index}`}
        name="select"
        value={value}
        onChange={handler}
        checked={checked[+index]}
      />
      {children}
    </label>
  </div>
);
export default RadioInput;
