import { Dispatch, SetStateAction } from 'react';

export const nextQuestion = (
  setQuestionNum: Dispatch<SetStateAction<number>>,
  questionNum: number,
  clearAnswer: () => void,
) => {
  setQuestionNum((prev) => prev + 1);

  history.pushState(
    null,
    `Question ${questionNum + 1}`,
    `${window.location.href.substring(
      0,
      window.location.href.lastIndexOf('/'),
    )}/${questionNum + 2}`,
  );

  clearAnswer();
};
