import { useEffect, useState } from 'react';
import { maxPointTrue } from '../api/maxPointTrue';
import { QuestionExtendedType } from '../QuizLayout';

export const useCheckTrueAnswer = (question: QuestionExtendedType) => {
  const [checked, setChecked] = useState([false, false, false]);
  const [trueAnswer, setTrueAnswer] = useState<number | undefined>(undefined);

  useEffect(() => {
    setChecked([false, false, false]);
    setTrueAnswer(maxPointTrue(question.data));
  }, [question.index]);

  return {
    checked,
    setChecked,
    trueAnswer,
  };
};
