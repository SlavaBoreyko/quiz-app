import React, { FC } from 'react';
import RadioInput from '../RadioInput/RadioInput';
import { InputChecked } from '../InputChecked/InputChecked';
import { QuestionTestType } from '../../../types/test.types';

interface RadioInputListProps {
  question: QuestionTestType;
  handler: (
    e: React.ChangeEvent<HTMLInputElement>,
    reaction: string | undefined,
  ) => void;
  checked: boolean[];
  indicatedAnswer?: number;
  trueAnswer: number | undefined;
}

export const RadioInputList: FC<RadioInputListProps> = ({
  question,
  handler,
  checked,
  indicatedAnswer,
  trueAnswer,
}) => (
  <>
    {question.answers.map((option, index: number) => (
      <RadioInput
        key={index}
        index={index}
        value={option.points}
        handler={(e: React.ChangeEvent<HTMLInputElement>) =>
          handler(e, option.reaction)
        }
        checked={checked}
      >
        <InputChecked
          checkedAnswer={indicatedAnswer}
          trueAnswer={trueAnswer}
          checked={checked[+index]}
          value={option.points}
          text={option.answer.ua}
        />
      </RadioInput>
    ))}
  </>
);
