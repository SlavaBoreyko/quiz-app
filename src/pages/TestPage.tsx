import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Containers/Container/Container';
import Test from '../components/Test/Test';

// import { addDoc, collection, serverTimestamp, getDoc, doc } from 'firebase/firestore'
import { useAppSelector } from '../app/hooks';


// redux-toolkit
import { useAppDispatch } from '../app/hooks';
import { useAddAnswerMutation } from '../features/user/userApi';
import { useFetchTestQuery } from '../features/test/testApi';
import { addDemoAnswer, UserAnswersType } from '../features/user/userSlice';

export interface TestPageProps {
}

const TestPage: FC<TestPageProps> = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const localDemoTest = localStorage.getItem('demoTest');

  // redux-toolkit
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state: any) => state.user);

  // const [test, setTest] = useState<TestType | any | undefined>(undefined);
  const [questionNum, setQuestion] = useState(0);
  const [value, setValue] = useState(-1);
  const [answersArr, setAnswersArr] = useState<number[]>([]);

  // REACTION
  const [reactionShow, setReactionShow] = useState(false);
  const [reactionSrc, setReactionSrc] = useState<string>('');
  const [demoAnswers, setDemoAnswers] = useState<any | undefined>(undefined);
  const [indecatedAnswer, setIndecatedAnswer] = useState<number | undefined>(undefined);

  // XTIVKA
  const [locked, setLocked] = useState<boolean>(false);
  const [ fullScreen, setFullScreen] = useState<boolean>(false);

  const { data: test }  = useFetchTestQuery(params.id!);

  const [language, setLanguage] = useState('ua');
  useEffect(() => {
    if(localDemoTest) {
      const demoTestParsed = JSON.parse(localDemoTest);
      setDemoAnswers(demoTestParsed);
    }
  },[]);
  // console.log('userState.language', userState.language);
  // console.log('language', language);

  useEffect(() => {
    const languageSet = localStorage.getItem('i18nextLng');
    if(userState.language) {
      setLanguage(userState.language);
    } else if(languageSet) {
      setLanguage(languageSet);
    }
  },[userState.language]);

  // Logic for /xtivka
  useEffect(() => {
    if (location.pathname.split('/')[1] === 'xtivka') {
      setLocked(true);
    }
    if(value !== -1) setReactionShow(true);
    if (value === 1) setLocked(false);   
  },[location.pathname, questionNum, value]);


  const fullScreenBtnHandle = () => {
    if (locked === false) {
      setFullScreen(prev => !prev);
    }
  };

  useEffect(() => {
    if(location.pathname.split('/')[3] === 'answers') {
      if(demoAnswers && params.id) {
        setIndecatedAnswer(demoAnswers[params.id].answersArray[questionNum]);
      }
    }
  }, [questionNum, demoAnswers, location.pathname]);

  // FOR ADMIN PAGE
  const calcResultPoints = () => {
    // sumPoints has to calculate when add addTest from Admin 
    if(test) {
      const resultPoints = Math.round(100*
        (answersArr.reduce((partialSum, a) => partialSum + a, 0) + value)/test.sumPoints);
      return resultPoints;
    }
    return 0;
  };

  const [ addAnswer ]  = useAddAnswerMutation();

  const saveAnswerNextQuestion = () => {
    setQuestion((prev) => prev + 1);
    setAnswersArr((prev) => [...prev, value]);
    //clear for next answer:
    setValue(0);
    setReactionShow(false);
    setReactionSrc('');
  };

  const nextHandler = async() => {
    if (test && location.pathname.split('/')[3] !== 'answers') {
      if (questionNum < test.questions.length - 1) {
        // 1 === true, 0 === false in database fields
        setReactionShow(false);
        saveAnswerNextQuestion();
      } 

      if (questionNum === test.questions.length - 1 && params.id) {
        // const calcPoints = 
        const testId = params.id;
        let ObjectWithTestId: UserAnswersType = {};
        ObjectWithTestId[testId] = {
          answersArray: [...answersArr, value],
          points: calcResultPoints(),
          // timestamp: serverTimestamp(),
        };
                
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
        setQuestion((prev) => prev + 1);
      } else  if (questionNum === test.questions.length - 1 && params.id) {
        return navigate(`/test/${params.id}/result`);
      }
    }
  };

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
              // language={userState.language}
              language={language}
              length={test.questions.length}
              questionNum={questionNum}
              question={test.questions[questionNum]} 

              value={value}
              setValue={setValue} 

              indicatedAnswer={indecatedAnswer}
              nextHandler={nextHandler}
              fullScreenBtnHandle={fullScreenBtnHandle}
              locked={locked}
              backBtnToggle={fullScreen}


              reactionSrc={reactionSrc}
              setReactionSrc={setReactionSrc}
              reactionShow={reactionShow}


              bloggerName={test.blogger.name}
              testName= {test.testName}
            />
          </Container>
        ) : ('API problem')
      }
    </>
  );
};

export default TestPage;