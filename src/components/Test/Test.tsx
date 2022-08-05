import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { QuestionTestType } from '../../types/test.types';
import Card from './Card/Card';
import ProgressBar from './ProgressBar/ProgressBar';
import RadioInput from './RadioInput/RadioInput'

export interface TestProps {
    length: number;
    questionNum: number;
    question: QuestionTestType;
    setValue: Dispatch<SetStateAction<number>>;
    nextHandler: () => void;
}

const Test: FC<TestProps> = ({
    length,
    questionNum,
    question, 
    setValue, 
    nextHandler
}) => {
    const [checked, setChecked] = useState([false,false,false]);

    useEffect(() => {
        setChecked([false, false, false]);
    },[questionNum])

  return (
    <>
        <Card title={question.question} />
        <ProgressBar 
            amountQA={length}
            current={questionNum + 1} 
            nextHandler={nextHandler}
        />
        {question.answers.map((variant, index) => (
            <RadioInput 
                key={index} 
                index={index}
                text={variant.answer} 
                value={variant.points}
                setValue={setValue}
                setChecked={setChecked}
                checked={checked}
            />
        ))}
    </>
  )
}
export default Test;
