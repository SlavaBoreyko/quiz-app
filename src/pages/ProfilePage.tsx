import { useEffect, useState } from 'react';
// import Container from '../components/Containers/Container/Container';
import ProfileHeader from '../components/Profile/ProfileHeader/ProfileHeader';
import { TestCardType } from '../types/test.types';
import { useNavigate } from 'react-router-dom';

// REDUX-TOOLKIT
import {
  useAddAnswerMutation,
  useFetchAnswersQuery,
} from '../features/user/userApi';
import { useAppSelector } from '../app/hooks';

// FIREBASE
import { RootState } from '../app/store';
import Container from '../components/Containers/Container/Container';
import TestCardPass from '../components/Profile/TestCard/TestCardPass/TestCardPass';
import { useFetchTestsCardsByListIdQuery } from '../features/test/testApi';
import ContainerList from '../components/Containers/ContainerList/ContainerList';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [listId, setListId] = useState<string[]>([]);
  const [testList, setTestList] = useState<TestCardType[] | undefined>(
    undefined,
  );

  const userState = useAppSelector((state: RootState) => state.user);
  const { data } = useFetchAnswersQuery(userState.id!);
  useEffect(() => {
    if (userState.answers) {
      setListId(Object.keys(userState.answers));
    }
  }, [userState.answers]);

  const { data: allPassedTests } = useFetchTestsCardsByListIdQuery(listId);
  useEffect(() => {
    if (allPassedTests) {
      setTestList(allPassedTests);
    }
  }, [allPassedTests]);

  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
  useEffect(() => {
    const languageSet = localStorage.getItem('i18nextLng');
    if (userState.language) {
      setLanguage(userState.language);
    } else if (languageSet) {
      setLanguage(languageSet);
    }
  }, [userState.language]);

  const [addAnswer] = useAddAnswerMutation();
  const localDemoTest = localStorage.getItem('demoTest');
  useEffect(() => {
    if (localDemoTest) {
      const demoTestParsed = JSON.parse(localDemoTest);
      addAnswer({ id: userState.id!, data: demoTestParsed });
      localStorage.removeItem('demoTest');
    }
  }, []);

  // TOTALPOINT CALC FUNCTION
  // useEffect(() => {
  //   if (testList) {
  //     let maxPointfromEveryQuestion: number[] = [];
  //     testList[0].questions.forEach((question) => {
  //       // one question
  //       let pointsFromOneAnswer: number[] = [];
  //       for (let i = 0; i < question.answers.length; i++) {
  //         pointsFromOneAnswer.push(+question.answers[i].points);
  //       }
  //       pointsFromOneAnswer.sort();
  //       maxPointfromEveryQuestion.push(
  //         pointsFromOneAnswer[question.answers.length - 1],
  //       );
  //     });
  //     const totalPoints = maxPointfromEveryQuestion.reduce(
  //       (totalPoints, maxPoints) => totalPoints + maxPoints,
  //     );
  //   }
  // }, [testList]);

  return (
    <Container justifyContent="flex-start" backgroundColor="#212529">
      {userState.name && userState.email && (
        <ProfileHeader
          marginTop={'6rem'}
          photoUrl={userState.photoUrl ? userState.photoUrl : ''}
          name={userState.name}
          description={userState.email}
        />
      )}
      <ContainerList>
        {data &&
          testList &&
          testList.map((testItem, index) => {
            if (data && testItem.id in data) {
              const points = data[testItem.id].points;
              return (
                <TestCardPass
                  id={testItem.id}
                  key={index}
                  testName={
                    language === 'or'
                      ? testItem.testName.or
                      : testItem.testName.ua
                  }
                  cover={testItem.cover}
                  blogger={testItem.blogger}
                  points={points}
                  language={language ? language : 'ua'}
                  onClick={() => navigate(`/test/${testItem.id}/result`)}
                />
              );
            }
          })}
      </ContainerList>
    </Container>
  );
};

export default ProfilePage;
