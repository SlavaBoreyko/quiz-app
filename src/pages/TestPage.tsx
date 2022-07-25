import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Container/Container'
import Test from '../components/Test/Test'
import { addAnswer } from '../service/user.service';
import { TestType } from '../types/test.types';

// import { addDoc, collection, serverTimestamp, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { doc, getDoc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { useAppSelector } from '../app/hooks';
import { addDemoAnswer, UserAnswersType } from '../features/user/userSlice';

// redux-toolkit
import { useAppDispatch } from '../app/hooks';
import { useAddAnswerMutation } from '../features/user/userApi';

export interface TestPageProps {
}

const TestPage: FC<TestPageProps> = () => {
    const params = useParams();
    const navigate = useNavigate();
    // redux-toolkit
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state: any) => state.user);

    const [test, setTest] = useState<TestType | any | undefined>(undefined);
    const [questionNum, setQuestion] = useState(0);
    const [value, setValue] = useState(0);
    const [answersArr, setAnswersArr] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async() => {
            if(params.id) {
                // MY DEMO
                // const testData = await getTest(+params.id);
                const docRef = doc(db, "tests", params.id);
                const getTestData = await getDoc(docRef);
                const data = getTestData.data()

                if (getTestData.exists()) {
                    setTest(data);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("Test is deleted!");
                }
            }
        };
        fetchData();
    }, [params.id])

    const [ addAnswer, result ]  = useAddAnswerMutation();

    const nextHandler = async() => {
        if (test) {
            if (questionNum < test.questions.length - 1) {
                setQuestion((prev) => prev + 1);
                setAnswersArr((prev) => [...prev, value]);
                //clear for next answer:
                setValue(0);
            }
            if (questionNum === test.questions.length - 1) {
                // 1. If  user finished first demo test without auth
                // we have to localStorage.setItem()

                if (!userState.id && params.id) {
                    const maxPoints = 3;
                    const resultPoints = Math.round(100*
                        (answersArr.reduce((partialSum, a) => partialSum + a, 0) + value)/(maxPoints* (answersArr.length+1)));
                  
                    const testId = params.id;
                    let ObjectWithTestId: UserAnswersType = {};
                    ObjectWithTestId[testId] = {
                            answersArray: [...answersArr, value],
                            points: resultPoints,
                    }
                    dispatch(addDemoAnswer(ObjectWithTestId));
                }

                // 2.1. If Test was passed (exists doc with userId)-> just update 
                // 2.2. else if user start new test -> addDoc with with userId 
                if (userState.id && params.id) {
                    const maxPoints = 3;
                    const resultPoints = Math.round(100*
                          (answersArr.reduce((partialSum, a) => partialSum + a, 0) + value)/(maxPoints* (answersArr.length+1)));

                    const testId = params.id;
                    let ObjectWithTestId: UserAnswersType = {};
                    ObjectWithTestId[testId] = {
                            answersArray: [...answersArr, value],
                            points: resultPoints,
                    }
                    addAnswer({id: userState.id, data: ObjectWithTestId});
                }
                
                return navigate(`/test/${params.id}/result`);
            }
        }
    }
    // console.log('userState from TestPage', userState);
    // console.log();

    return (
    <>
        {
        (test) ? (
        <Container 
            img={test.questions[questionNum].img} 
            justifyContent='flex-end'
        >
            <Test 
                length={test.questions.length}
                questionNum={questionNum}
                question={test.questions[questionNum]} 
                setValue={setValue} 
                nextHandler={nextHandler}
            />
        </Container>
        ) : ('Api problem')
        }
     </>
    )
}

export default TestPage