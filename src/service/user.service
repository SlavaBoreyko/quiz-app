import { AnswersType } from "../types/user.types";

const answers: AnswersType = [];

export const getAnswers = async (): Promise<AnswersType> => answers;
// export const getSportById = async (id: SportType["id"]) =>
//   sports.items.find((s) => s.id === id);

export const addAnswer = async (newAnswer: number) => answers.push(newAnswer);

export const sumAnswers = async (): Promise<number> => answers.reduce((partialSum, a) => partialSum + a, 0);

