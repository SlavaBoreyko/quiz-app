import { useEffect, useState } from 'react';
import { TestType } from '../../../types/test.types';
import { QuestionExtendedType } from '../QuizLayout';

export const useQuestionDataByPage = (
  page: string | undefined,
  test: TestType,
) => {
  const [questionNum, setQuestionNum] = useState(0);

  useEffect(() => {
    page && setQuestionNum(+page - 1);
  }, [page]);

  const questionExtended: QuestionExtendedType | undefined = test
    ? {
        data: test.questions[questionNum],
        length: test.questions.length,
        index: questionNum,
      }
    : undefined;

  return { questionExtended, questionNum, setQuestionNum };
};
