import React, { FC } from 'react';
import s from './RadioInput.module.scss';
import { InputChecked } from '../InputChecked/InputChecked';

export interface RadioInputProps {
  text: any;
  index: number;
  value: any;
  checked: boolean[];
  handler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  indicatedAnswer?: number;
  trueAnswer?: number;
}

const RadioInput: FC<RadioInputProps> = ({
  text,
  value,
  index,
  checked,
  handler,
  indicatedAnswer,
  trueAnswer,
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
      <InputChecked
        checkedAnswer={indicatedAnswer}
        trueAnswer={trueAnswer}
        checked={checked}
        index={index}
        value={value}
        text={text}
      />
    </label>
  </div>
);
export default RadioInput;
