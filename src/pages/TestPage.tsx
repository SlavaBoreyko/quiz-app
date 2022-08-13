import React, { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    // redux-toolkit
    const dispatch = useAppDispatch();
    const userState = useAppSelector((state: any) => state.user);

    const [test, setTest] = useState<TestType | any | undefined>(undefined);
    const [questionNum, setQuestion] = useState(0);
    const [value, setValue] = useState(-1);
    const [answersArr, setAnswersArr] = useState<number[]>([]);

    // REACTION
    const [reactionShow, setReactionShow] = useState(false);
    const [reactionSrc, setReactionSrc] = useState<string>('');
    const [demoAnswers, setDemoAnswers] = useState<any | undefined>(undefined);
    const [indecatedAnswer, setIndecatedAnswer] = useState<number | undefined>(undefined);
    const [isNext, setIsNext] = useState<boolean>(false);

    const [locked, setLocked] = useState<boolean>(false);
    const [ fullScreen, setFullScreen] = useState<boolean>(false);

    const localDemoTest = localStorage.getItem('demoTest');

    useEffect(() => {
        if(localDemoTest) {
            const demoTestParsed = JSON.parse(localDemoTest);
            setDemoAnswers(demoTestParsed)
        }
    },[])

    // Logic for /xtivka
    useEffect(() => {
        if (location.pathname.split('/')[1] === 'xtivka') {
            setLocked(true);
        }
        if(value !== -1) setReactionShow(true);
        if (value === 1) setLocked(false);   
    },[location.pathname, questionNum, value])

    const fullScreenBtnHandle = () => {
        if (locked === false) {
            setFullScreen(prev => !prev);
        }
    }

    useEffect(() => {
        if(location.pathname.split('/')[3] === 'answers') {
            if(demoAnswers && params.id) {
                setIndecatedAnswer(demoAnswers[params.id].answersArray[questionNum]);
            }
        }

    }, [questionNum, demoAnswers, location.pathname])

    // console.log(indecatedAnswer);
    // console.log('demoAnswers', demoAnswers[params.id!].answersArray);

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
                    // console.log("Test is deleted!");
                }
            }
        };
        fetchData();
    }, [params.id])

    useEffect(() => {
        if(test) {
            const totalPoints = getTotalPoints(test);
            // console.log('totalPoints getTotalPoints(test) ', totalPoints);
        }
    }, [test])

    const [ addAnswer, result ]  = useAddAnswerMutation();

    // FOR ADMIN PAGE
    const calcResultPoints = () => {
        // maxPoints need calculate when addTest from Admin 
        const maxPoints = 30; // 3*10 questions
        const resultPoints = Math.round(100*
            (answersArr.reduce((partialSum, a) => partialSum + a, 0) + value)/maxPoints);
        return resultPoints;
    }

    const saveAnswerNextQuestion = () => {
        // preLocked next image
        // setLocked(true);

        setQuestion((prev) => prev + 1);
        console.log('value from setAnswersArr', value );

        setAnswersArr((prev) => [...prev, value]);

        //clear for next answer:
        setValue(0);
        setReactionShow(false)
        setReactionSrc('');
        setIsNext(false);
    }

    const nextHandler = async() => {
        if (test && location.pathname.split('/')[3] !== 'answers') {
            if (questionNum < test.questions.length - 1) {
                // 1 === true, 0 === false in database fields
                setIsNext(true)
                setReactionShow(false);
                saveAnswerNextQuestion();
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
                return navigate(`/test/${params.id}/result`);
            }
        } else if (test && location.pathname.split('/')[3] === 'answers') {
            if (questionNum < test.questions.length - 1) {
                setReactionShow(false);
                saveAnswerNextQuestion();
            } else  if (questionNum === test.questions.length - 1 && params.id) {
                return navigate(`/test/${params.id}/result`);
            }
        }
    }

    return (
    <>
        {
        (test) ? (
        <Container
            img={test.questions[questionNum].img} 
            backgroundColor='#000000a0'
            // backgroundColor='#000000cb'
            justifyContent='flex-end'
            locked={locked}
            fullScreen={fullScreen}
        >
            <Test 
                length={test.questions.length}
                questionNum={questionNum}
                question={test.questions[questionNum]} 

                value={value}
                setValue={setValue} 

                indicatedAnswer={indecatedAnswer}
                nextHandler={nextHandler}
                fullScreenBtnHandle={fullScreenBtnHandle}
                isNext={isNext}

                reactionSrc={reactionSrc}
                setReactionSrc={setReactionSrc}
                reactionShow={reactionShow}
            />
        </Container>
        ) : ('API problem')
        }
     </>
    )
}

export default TestPage