import React, { FC } from 'react';
import s from './InputChecked.module.scss';

interface InputCheckedProps {
  checkedAnswer: number | undefined;
  trueAnswer: number | undefined;
  checked: boolean;
  value: number;
  text: string;
}

export const InputChecked: FC<InputCheckedProps> = ({
  checkedAnswer,
  trueAnswer,
  checked,
  value,
  text,
}) => (
  <>
    {(checkedAnswer === undefined || trueAnswer === undefined) && (
      <div className={checked ? s.textContainerTrue : s.textContainer}>
        <span>{text}</span>
      </div>
    )}
    {/* FOR watching my /answers  */}
    {checkedAnswer !== undefined && trueAnswer !== undefined && (
      <div
        className={
          value === trueAnswer
            ? s.textContainerTrue
            : value === checkedAnswer
            ? s.textContainerFalse
            : s.textContainer
        }
      >
        <span>{text}</span>
      </div>
    )}
  </>
);
