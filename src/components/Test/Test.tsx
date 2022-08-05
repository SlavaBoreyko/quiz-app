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
    indicatedAnswer?: number;
    nextHandler: () => void;
    reactionSrc?: string;
    setReactionSrc?: Dispatch<SetStateAction<string>>;
    reactionShow?: boolean;
}

const Test: FC<TestProps> = ({
    length,
    questionNum,
    question, 
    setValue, 
    indicatedAnswer,
    nextHandler,
    reactionSrc,
    setReactionSrc,
    reactionShow,
}) => {
    const [checked, setChecked] = useState([false,false,false]);
    const [trueAnswer, setTrueAnswer] = useState<number | undefined>(undefined);
    
    let pointsArray: number[] = []; 
    const maxPointTrue = () => {
        question.answers.forEach((variant) => 
            pointsArray.push(variant.points)
        )
        return Math.max.apply(null, pointsArray);
    }

    useEffect(() => {
        setChecked([false, false, false]);
        const answermaxPointTrue = maxPointTrue();
        setTrueAnswer(answermaxPointTrue);
    },[questionNum])



    // const trueAnswer = maxPointTrue();

    console.log('trueAnswer', trueAnswer);
    // console.log('{indicatedAnswer === variant.points}', indicatedAnswer === +question.answers[1].points)

  return (
    <>
        <Card 
            title={question.question} 
            reactionSrc={reactionSrc}
            reactionShow={reactionShow}
        />
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
  )
}
export default Test;
