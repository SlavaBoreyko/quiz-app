import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { TestQuestionType } from '../../types/test.types';
import Card from './Card/Card';
import ProgressBar from './ProgressBar/ProgressBar';
import RadioInput from './RadioInput/RadioInput'

export interface TestProps {
    length: number;
    questionNum: number;
    question: TestQuestionType;
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

    console.log(question);

  return (
    <>
        <Card title={question.title} />
        <ProgressBar 
            amountQA={length}
            current={questionNum + 1} 
            nextHandler={nextHandler}
        />
        {question.answers.map((answer, index) => (
            <RadioInput 
                key={index} 
                index={index}
                text={Object.values(answer)} 
                value={Object.keys(answer)}
                setValue={setValue}
                setChecked={setChecked}
                checked={checked}
            />
        ))}
    </>
  )
}
export default Test;
