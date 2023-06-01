import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { QuestionTestType } from '../../types/test.types';
import Card from './Card/Card';
import { ProgressPanel } from './ProgressPanel/ProgressPanel';
import RadioInput from './RadioInput/RadioInput';
import { answerHandler } from './RadioInput/api/answerHandler';

export interface TestProps {
  length: number;
  questionNum: number;
  // questions: QuestionTestType[];
  question: QuestionTestType;

  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  indicatedAnswer?: number;

  nextIcon: string;
  nextHandler: () => void;

  reactionSrc?: string;
  setReactionSrc?: Dispatch<SetStateAction<string>>;
  reactionShow?: boolean;

  bloggerName: {
    pl: string;
    ua: string;
    or: string;
  };
  testName: {
    pl: string;
    ua: string;
    or: string;
  };

  language: string;
}

const Test: FC<TestProps> = ({
  length,
  questionNum,
  question,

  // value,
  setValue,
  indicatedAnswer,

  nextIcon,
  nextHandler,

  reactionSrc,
  setReactionSrc,
  reactionShow,

  language,
}) => {
  const [checked, setChecked] = useState([false, false, false]);
  const [trueAnswer, setTrueAnswer] = useState<number | undefined>(undefined);

  // FOR XTIVKA_TEST
  let pointsArray: number[] = [];
  const maxPointTrue = () => {
    question.answers.forEach((variant) => pointsArray.push(variant.points));
    return Math.max.apply(null, pointsArray);
  };
  // FOR XTIVKA_TEST
  useEffect(() => {
    setChecked([false, false, false]);
    const answermaxPointTrue = maxPointTrue();
    setTrueAnswer(answermaxPointTrue);
  }, [questionNum]);

  const answerSimpleHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    reaction: string | undefined,
  ) => answerHandler(e, setChecked, setValue, reaction, setReactionSrc);

  return (
    <>
      <Card reactionSrc={reactionSrc} reactionShow={reactionShow} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <ProgressPanel
          question={question.question.ua}
          length={length}
          count={questionNum + 1}
          nextHandler={nextHandler}
        />
        {question.answers.map((variant, index: number) => (
          <RadioInput
            key={index}
            index={index}
            // text={t(`answer.${index}`)}
            text={variant.answer.ua}
            value={variant.points}
            handler={(e: React.ChangeEvent<HTMLInputElement>) =>
              answerSimpleHandler(e, variant.reaction)
            }
            checked={checked}
            indicatedAnswer={indicatedAnswer}
            trueAnswer={trueAnswer}
          />
        ))}
      </div>
    </>
  );
};
export default Test;
