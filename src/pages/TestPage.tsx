import React, { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Containers/Container/Container';
import Test from '../components/Test/Test'
import { TestType } from '../types/test.types';

// import { addDoc, collection, serverTimestamp, getDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useAppSelector } from '../app/hooks';
import { addDemoAnswer, UserAnswersType } from '../features/user/userSlice';

// redux-toolkit
import { useAppDispatch } from '../app/hooks';
import { useAddAnswerMutation } from '../features/user/userApi';
import { getTotalPoints } from '../actions/getTotalPoints';

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
        // change to fetchTestList (name, blogger photos, idstring)
        const fetchData = async() => {
            if(params.id) {
                const docRef = doc(db, "tests", params.id);
                const getTestData = await getDoc(docRef);
                const data = getTestData.data()

                if (getTestData.exists()) {
                    setTest(data);
                } else {
                    console.log("Test is deleted!");
                }
            }
        };
        fetchData();
    }, [params.id])

    useEffect(() => {
        if(test) {
            const totalPoints = getTotalPoints(test);
            console.log('totalPoints getTotalPoints(test) ', totalPoints);
        }
    }, [test])

    const [ addAnswer, result ]  = useAddAnswerMutation();

    const calcResultPoints = () => {
        // maxPoints need calculate when addTest from Admin 
        const maxPoints = 30; // 3*10 questions
        const resultPoints = Math.round(100*
            (answersArr.reduce((partialSum, a) => partialSum + a, 0) + value)/maxPoints);
        return resultPoints;
    }
     
    const nextHandler = async() => {
        if (test) {
            if (questionNum < test.questions.length - 1) {
                setQuestion((prev) => prev + 1);
                setAnswersArr((prev) => [...prev, value]);
                //clear for next answer:
                setValue(0);
            }
            if (questionNum === test.questions.length - 1 && params.id) {
                const calcPoints = calcResultPoints();
                const testId = params.id;
                let ObjectWithTestId: UserAnswersType = {};
                ObjectWithTestId[testId] = {
                        answersArray: [...answersArr, value],
                        points: calcPoints,
                        // timestamp: serverTimestamp(),
                }
                
                switch (userState.id) {
                    // 1. If  user finished first demo test without auth
                    // we have to localStorage.setItem()
                    case undefined: 
                        dispatch(addDemoAnswer(ObjectWithTestId));
                        break;
                    // 2.1. If Test was passed (exists doc with userId)-> just update 
                    // 2.2. else if user start new test -> addDoc with with userId 
                    default:
                        addAnswer({id: userState.id, data: ObjectWithTestId});
                }
                // // 1. If  user finished first demo test without auth
                // // we have to localStorage.setItem()
                // if (!userState.id) {
                //     console.log(userState.id);
                //     dispatch(addDemoAnswer(ObjectWithTestId));
                // }
                // // // 2.1. If Test was passed (exists doc with userId)-> just update 
                // // // 2.2. else if user start new test -> addDoc with with userId 
                // if (userState.id) {
                //     console.log('ObjectWithTestId before addAnswer', ObjectWithTestId)
                //     addAnswer({id: userState.id, data: ObjectWithTestId});
                // }
                return navigate(`/test/${params.id}/result`);
            }
        }
    }
    // console.log('userState from TestPage', userState);
    console.log('answersArr', answersArr);
    return (
    <>
        {
        (test) ? (
        <Container
            img={test.questions[questionNum].img} 
            // img={testStore02}
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
        ) : ('API problem')
        }
     </>
    )
}

export default TestPage