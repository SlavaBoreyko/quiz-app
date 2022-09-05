import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Containers/Container/Container';
import Test from '../components/Test/Test';
import galleryIcon from '../assets/svg/navigation/gallery-2-1.svg';
import arrowIcon from '../assets/svg/arrow-right.svg';

// import { addDoc, collection, serverTimestamp, getDoc, doc } from 'firebase/firestore'
import { useAppSelector } from '../app/hooks';


// redux-toolkit
import { useAppDispatch } from '../app/hooks';
import { useAddAnswerMutation } from '../features/user/userApi';
import { useFetchTestQuery } from '../features/test/testApi';
import { addDemoAnswer, UserAnswersType } from '../features/user/userSlice';
import { useTestCompleteMutation } from '../features/blogger/bloggerApi';

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
  const [answersArrayPrev, setAnswersArrayPrev] = useState<number[] | undefined>(undefined);

  // NEW NAVIGATION
  // useEffect(() => {
  //   setQuestion(+location.pathname.substring(location.pathname.lastIndexOf('/') + 1));
  // },[location.pathname]);
  useEffect(() => {
    params.numPage && setQuestion(+params.numPage-1);
  },[params.numPage]);
  
  useEffect(() => {
    const state: any = location.state;
    state && state.answersArray && setAnswersArrayPrev(state.answersArray);
  },[location.state]);

  // REACTION
  const [reactionShow, setReactionShow] = useState(false);
  const [reactionSrc, setReactionSrc] = useState<string>('');
  const [demoAnswers, setDemoAnswers] = useState<any | undefined>(undefined);
  const [indecatedAnswer, setIndecatedAnswer] = useState<number | undefined>(undefined);

  // XTIVKA
  const [locked, setLocked] = useState<boolean>(false);
  const [ fullScreen, setFullScreen] = useState<boolean>(false);

  const [testComplete] = useTestCompleteMutation();

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
    if (location.pathname.split('/')[1] === 'game') {
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
    history.pushState(
      null, 
      `Question ${questionNum + 1}`, 
      `${window.location.href.substring(0,window.location.href.lastIndexOf("/"))}/${questionNum + 2}`
    );

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

      if ((questionNum === test.questions.length - 1 && params.id)
        || answersArrayPrev 
      ) {
        const testId = params.id!;
        let ObjectWithTestId: UserAnswersType = {};

        // XT: SECOND ATTEMT  
        if(answersArrayPrev && answersArrayPrev.length > 0) {
          let array = answersArrayPrev;
          array[questionNum] = value;
          ObjectWithTestId[testId] = {
            answersArray: [...array],
            points: calcResultPoints(),
            // timestamp: serverTimestamp(),
          };
        } else {
          ObjectWithTestId[testId] = {
            answersArray: [...answersArr, value],
            points: calcResultPoints(),
            // timestamp: serverTimestamp(),
          };
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
        
        // CHECK IF TEST.ID DOESN'T CONTAINS IN USER.ANSWERS[KEY]
        // await testComplete(test.blogger.id);
        const linkToResult = `${location.pathname.substring(0,location.pathname.lastIndexOf("/"))}/result`;
        return navigate(linkToResult);
      }
    } else if (test && location.pathname.split('/')[3] === 'answers') {
      if (questionNum < test.questions.length - 1) {
        setReactionShow(false);
        setQuestion((prev) => prev + 1);
      } else  if (questionNum === test.questions.length - 1 && params.id) {

        // CHECK IF TEST.ID DOESN'T CONTAINS IN USER.ANSWERS[KEY]
        // await testComplete(test.blogger.id);
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
            {/* <Routes>
              <Route path={`/:numPage`} element={ */}
            <Test 
              language={language}
              length={test.questions.length}
              questionNum={questionNum}
              question={test.questions[questionNum]} 
              // questions={test.questions} 
            
              value={value}
              setValue={setValue} 
              indicatedAnswer={indecatedAnswer}
              nextIcon={answersArrayPrev ? galleryIcon : arrowIcon}
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
            {/* } 
              />
            </Routes> */}
          </Container>
        ) : ('API problem')
      }
    </>
  );
};

export default TestPage;