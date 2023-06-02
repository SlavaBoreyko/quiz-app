import { QuestionTestType } from '../../../types/test.types';

export const maxPointTrue = (question: QuestionTestType) => {
  let pointsArray: number[] = [];
  question.answers.forEach((variant) => pointsArray.push(variant.points));
  return Math.max.apply(null, pointsArray);
};
