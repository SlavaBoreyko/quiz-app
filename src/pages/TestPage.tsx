import React, { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Containers/Container/Container';
import {
  QuizLayout,
  QuestionExtendedType,
} from '../components/Test/QuizLayout';
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
import { useSticker } from '../components/Test/hooks';

export interface TestPageProps {}

const TestPage: FC<TestPageProps> = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const localDemoTest = localStorage.getItem('demoTest');

  // redux-toolkit
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state: any) => state.user);

  const [questionNum, setQuestion] = useState(0);
  const [value, setValue] = useState(-1);
  const [answersArr, setAnswersArr] = useState<number[]>([]);
  const [answersArrayPrev, setAnswersArrayPrev] = useState<
    number[] | undefined
  >(undefined);

  useEffect(() => {
    params.numPage && setQuestion(+params.numPage - 1);
  }, [params.numPage]);

  useEffect(() => {
    const state: any = location.state;
    state && state.answersArray && setAnswersArrayPrev(state.answersArray);
  }, [location.state]);

  // STICKER
  // REFACTORING
  const sticker = useSticker();
  // const [reactionShow, setReactionShow] = useState(false);
  // const [reactionSrc, setReactionSrc] = useState<string>('');
  const [demoAnswers, setDemoAnswers] = useState<any | undefined>(undefined);
  const [indecatedAnswer, setIndecatedAnswer] = useState<number | undefined>(
    undefined,
  );

  // const [testComplete] = useTestCompleteMutation();

  const { data: test } = useFetchTestQuery(params.id!);

  useEffect(() => {
    if (localDemoTest) {
      const demoTestParsed = JSON.parse(localDemoTest);
      setDemoAnswers(demoTestParsed);
    }
  }, []);

  // Logic for /xtivka
  useEffect(() => {
    if (value !== -1) sticker.setShow(true);
  }, [location.pathname, questionNum, value]);

  useEffect(() => {
    if (location.pathname.split('/')[3] === 'answers') {
      if (demoAnswers && params.id) {
        setIndecatedAnswer(demoAnswers[params.id].answersArray[questionNum]);
      }
    }
  }, [questionNum, demoAnswers, location.pathname]);

  // FOR ADMIN PAGE
  const calcResultPoints = () => {
    // sumPoints has to calculate when add addTest from Admin
    if (test) {
      const resultPoints = Math.round(
        (100 *
          (answersArr.reduce((partialSum, a) => partialSum + a, 0) + value)) /
          test.sumPoints,
      );
      return resultPoints;
    } else return 0;
  };

  const [addAnswer] = useAddAnswerMutation();

  const saveAnswerNextQuestion = () => {
    setQuestion((prev) => prev + 1);
    setAnswersArr((prev) => [...prev, value]);

    history.pushState(
      null,
      `Question ${questionNum + 1}`,
      `${window.location.href.substring(
        0,
        window.location.href.lastIndexOf('/'),
      )}/${questionNum + 2}`,
    );
    //clear for next answer:
    setValue(0);
    sticker.setShow(false);
    sticker.setImg('');
  };

  const nextHandler = async () => {
    if (test && location.pathname.split('/')[3] !== 'answers') {
      if (questionNum < test.questions.length - 1) {
        // 1 === true, 0 === false in database fields
        sticker.setShow(false);
        saveAnswerNextQuestion();
      }

      if (
        (questionNum === test.questions.length - 1 && params.id) ||
        answersArrayPrev
      ) {
        const testId = params.id!;
        let ObjectWithTestId: UserAnswersType = {};

        // XT: SECOND ATTEMT
        if (answersArrayPrev && answersArrayPrev.length > 0) {
          let array = answersArrayPrev;
          let sum = answersArrayPrev.reduce(
            (partialSum, a) => partialSum + a,
            0,
          );

          if (value === -1) array[questionNum] = 0;
          else {
            array[questionNum] = value;
            sum = sum + value;
          }

          ObjectWithTestId[testId] = {
            answersArray: [...array],
            points: sum,
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
            addAnswer({ id: userState.id, data: ObjectWithTestId });
        }

        // CHECK IF TEST.ID DOESN'T CONTAINS IN USER.ANSWERS[KEY]
        // await testComplete(test.blogger.id);
        const linkToResult = `${location.pathname.substring(
          0,
          location.pathname.lastIndexOf('/'),
        )}/result`;
        return navigate(linkToResult);
      }
    } else if (test && location.pathname.split('/')[3] === 'answers') {
      if (questionNum < test.questions.length - 1) {
        sticker.setShow(false);
        setQuestion((prev) => prev + 1);
      } else if (questionNum === test.questions.length - 1 && params.id) {
        // CHECK IF TEST.ID DOESN'T CONTAINS IN USER.ANSWERS[KEY]
        // await testComplete(test.blogger.id);
        return navigate(`/test/${params.id}/result`);
      }
    }
  };

  const questionExtended: QuestionExtendedType | undefined = test
    ? {
        data: test.questions[questionNum],
        length: test.questions.length,
        index: questionNum,
      }
    : undefined;

  return (
    <>
      {test ? (
        <Container
          img={test.questions[questionNum].img}
          backgroundColor="none"
          justifyContent="flex-end"
        >
          <QuizLayout
            question={questionExtended}
            setValue={setValue}
            indicatedAnswer={indecatedAnswer}
            nextHandler={nextHandler}
            sticker={sticker}
          />
        </Container>
      ) : (
        'Please refresh the page'
      )}
    </>
  );
};

export default TestPage;
