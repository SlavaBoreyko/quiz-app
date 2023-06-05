import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { StickerDataType } from '../QuizLayout';

export const useAnswersLogic = (
  demoAnswers: any,
  setShow: Dispatch<SetStateAction<boolean>>,
  questionNum: number,
) => {
  const location = useLocation();
  const params = useParams();
  const [value, setValue] = useState(-1);
  const [answersArr, setAnswersArr] = useState<number[]>([]);
  const [answersArrayPrev, setAnswersArrayPrev] = useState<
    number[] | undefined
  >(undefined);
  const [indecatedAnswer, setIndecatedAnswer] = useState<number | undefined>(
    undefined,
  );

  useEffect(() => {
    const state: any = location.state;
    state && state.answersArray && setAnswersArrayPrev(state.answersArray);
  }, [location.state]);

  useEffect(() => {
    if (value !== -1) setShow(true);
    //   }, [location.pathname, questionNum, value]);
  }, [value]);

  useEffect(() => {
    if (location.pathname.split('/')[3] === 'answers') {
      if (demoAnswers && params.id) {
        setIndecatedAnswer(demoAnswers[params.id].answersArray[questionNum]);
      }
    }
  }, [questionNum, demoAnswers, location.pathname]);

  return {
    value,
    setValue,
    indecatedAnswer,
    answersArr,
    setAnswersArr,
    answersArrayPrev,
  };
};
