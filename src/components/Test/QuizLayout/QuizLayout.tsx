import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { QuestionTestType } from '../../../types/test.types';
import Card from '../Card/Card';
import { ProgressPanel } from '../ProgressPanel/ProgressPanel';
import { answerHandler } from '../RadioInput/api/answerHandler';
import { RadioInputList } from '../RadioInputList/RadioInputList';
import { maxPointTrue } from '../api/maxPointTrue';
import s from './QuizLayout.module.scss';
import { useCheckTrueAnswer } from '../hooks/useCheckTrueAnswer';

export type QuestionExtendedType = {
  data: QuestionTestType;
  length: number;
  index: number;
};

export type StickerDataType = {
  img: string;
  setImg: Dispatch<SetStateAction<string>>;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export interface QuizLayoutProps {
  question: QuestionExtendedType | undefined;
  setValue: Dispatch<SetStateAction<number>>;
  indicatedAnswer?: number;
  nextHandler: () => void;
  sticker?: StickerDataType;
}

export const QuizLayout: FC<QuizLayoutProps> = ({
  question,
  setValue,
  indicatedAnswer,
  nextHandler,
  sticker,
}) => {
  if (!question) return null;
  const { checked, setChecked, trueAnswer } = useCheckTrueAnswer(question);

  const answerSimpleHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    stickerSrc: string | undefined,
  ) => answerHandler(e, setChecked, setValue, stickerSrc, sticker?.setImg);

  return (
    <>
      <Card sticker={sticker} />
      <div className={s.container}>
        <ProgressPanel
          question={question.data.question.ua}
          length={question.length}
          count={question.index + 1}
          nextHandler={nextHandler}
        />
        <RadioInputList
          question={question.data}
          handler={answerSimpleHandler}
          checked={checked}
          indicatedAnswer={indicatedAnswer}
          trueAnswer={trueAnswer}
        />
      </div>
    </>
  );
};
