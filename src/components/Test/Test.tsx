import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { QuestionTestType } from '../../types/test.types';
import Card from './Card/Card';
import ProgressBar from './ProgressBar/ProgressBar';
import RadioInput from './RadioInput/RadioInput';

export interface TestProps {
  length: number;
  questionNum: number;
  question: QuestionTestType;

  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  indicatedAnswer?: number;

  nextHandler: () => void;
  isNext: boolean;

  reactionSrc?: string;
  setReactionSrc?: Dispatch<SetStateAction<string>>;
  reactionShow?: boolean;

  fullScreenBtnHandle: () => void;

  bloggerName: {
    ua: string;
    or: string;
  };
  testName:  {
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
  nextHandler,
  isNext,

  reactionSrc,
  setReactionSrc,
  reactionShow,

  fullScreenBtnHandle,

  // bloggerName,
  // testName,

  language
}) => {
  // const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
  // const { t } = useTranslation();
  // useEffect(() => {

  //     const languageSet = localStorage.getItem('i18nextLng');
  //     languageSet && setLanguage(languageSet);
  // },[questionNum]);

  // const translationsUA = {
  //     question: question.question.ua,
  //     answer: {
  //         0: question.answers[0].answer.ua,
  //         1: question.answers[1].answer.ua,
  //         2: question.answers[2].answer.ua,
  //     },
  //     bloggerName: bloggerName.ua,
  //     testName: testName.ua,
  // }
  // const translationsOR = {
  //     question: question.question.or,
  //     answer: {
  //         0: question.answers[0].answer.or,
  //         1: question.answers[1].answer.or,
  //         2: question.answers[2].answer.or,
  //     },
  //     bloggerName: bloggerName.or,
  //     testName: testName.or,
  // }

  // useEffect(() => {
  //     // const lang = localStorage.getItem('i18nextLng');
  //     initLang( translationsUA, translationsOR);
  // },[]);

  // useEffect(() => {
  //     // const lang = localStorage.getItem('i18nextLng');
  //     // initLang(lang, translationsUA, translationsOR);
  //     // initLang(translationsUA, translationsOR);

  //     // i18n.addResource('ua', 'translationsUA', key, value, options)
  // },[ questionNum]);
    

  const [checked, setChecked] = useState([false,false,false]);
  const [trueAnswer, setTrueAnswer] = useState<number | undefined>(undefined);
    
  // FOR XTIVKA_TEST
  let pointsArray: number[] = []; 
  const maxPointTrue = () => {
    question.answers.forEach((variant) => 
      pointsArray.push(variant.points)
    );
    return Math.max.apply(null, pointsArray);
  };
  // FOR XTIVKA_TEST
  useEffect(() => {
    setChecked([false, false, false]);
    const answermaxPointTrue = maxPointTrue();
    setTrueAnswer(answermaxPointTrue);
  },[questionNum]);

  // const trueAnswer = maxPointTrue();

  // console.log('trueAnswer', trueAnswer);
  // console.log('{indicatedAnswer === variant.points}', indicatedAnswer === +question.answers[1].points)

  return (
    <>
      <Card 
        reactionSrc={reactionSrc}
        reactionShow={reactionShow}
      />
      <ProgressBar 
        // question={t('question')}
        question={(language && language === 'or') ? question.question.or : question.question.ua}
        amountQA={length}
        current={questionNum + 1} 
        nextHandler={nextHandler}
        isNext={isNext}
        fullScreenBtnHandle={fullScreenBtnHandle}
      />
      {question.answers.map((variant, index: number) => (
        <RadioInput 
          key={index} 
          index={index}
          // text={t(`answer.${index}`)}
          text={(language && language === 'or') ? variant.answer.or : variant.answer.ua}
          value={variant.points}
          reaction={variant.reaction}
          setReactionSrc={setReactionSrc}
          setValue={setValue}
          setChecked={setChecked}
          checked={checked}
          indicatedAnswer={indicatedAnswer}
          trueAnswer={trueAnswer}
        />
      ))}
    </>
  );
};
export default Test;
