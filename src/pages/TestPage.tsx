import { FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Container from '../components/Containers/Container/Container';
import { QuizLayout } from '../components/Test/QuizLayout';
import { nextQuestion } from '../components/Test/api';
import { useQuestionDataByPage, useSticker } from '../components/Test/hooks';
import { useAnswersLogic } from '../components/Test/hooks/useAnswersLogic';
import { useDemoAnswersFromStorage } from '../components/Test/hooks/useDemoAnswersFromStorage';
import { calcResultPoints } from '../components/Test/utils';
import { useFetchTestQuery } from '../features/test/testApi';
import { useAddAnswerMutation } from '../features/user/userApi';
import { UserAnswersType, addDemoAnswer } from '../features/user/userSlice';

export interface TestPageProps {}

const TestPage: FC<TestPageProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const { data: test } = useFetchTestQuery(params.id);
  const { questionExtended, questionNum, setQuestionNum } =
    useQuestionDataByPage(params.numPage, test);
  const demoAnswers = useDemoAnswersFromStorage();
  const sticker = useSticker();

  // redux-toolkit
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state: any) => state.user);
  const [addAnswer] = useAddAnswerMutation();
  // const [testComplete] = useTestCompleteMutation();

  const {
    value,
    setValue,
    indecatedAnswer,
    answersArr,
    setAnswersArr,
    answersArrayPrev,
  } = useAnswersLogic(demoAnswers, sticker.setShow, questionNum);

  const clearAnswer = () => {
    setValue(0);
    sticker.setShow(false);
    sticker.setImg('');
  };

  const nextHandler = async () => {
    if (test && location.pathname.split('/')[3] !== 'answers') {
      if (questionNum < test.questions.length - 1) {
        // 1 === true, 0 === false in database fields
        sticker.setShow(false);
        setAnswersArr((prev) => [...prev, value]);
        nextQuestion(setQuestionNum, questionNum, clearAnswer);
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
            points: calcResultPoints(answersArr, value, test.sumPoints),
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
        setQuestionNum((prev) => prev + 1);
      } else if (questionNum === test.questions.length - 1 && params.id) {
        // CHECK IF TEST.ID DOESN'T CONTAINS IN USER.ANSWERS[KEY]
        // await testComplete(test.blogger.id);
        return navigate(`/test/${params.id}/result`);
      }
    }
  };

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
