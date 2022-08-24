import { useEffect, useState } from 'react';
// import Container from '../components/Containers/Container/Container';
import ProfileHeader from '../components/Profile/ProfileHeader/ProfileHeader';
import { TestCardType } from '../types/test.types';
import { useNavigate } from 'react-router-dom';

// REDUX-TOOLKIT
import { useAddAnswerMutation, useFetchAnswersQuery } from '../features/user/userApi'
import { useAppSelector } from '../app/hooks';

// FIREBASE
import { RootState } from '../app/store';
import Container from '../components/Containers/Container/Container';
import TestCardPass from '../components/Profile/TestCard/TestCardPass/TestCardPass';
import TestCardOpen from '../components/Profile/TestCard/TestCardOpen/TestCardOpen';
import { useFetchTestsByBloggerQuery } from '../features/test/testApi';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { data: allTestsByBlogger }  = useFetchTestsByBloggerQuery('Фан-клуб Дівертіто');
    const [testList, setTestList] = useState<TestCardType[] | undefined>(undefined);
    // FOR NEXT SORT 
    useEffect(() => {
        if(allTestsByBlogger) {
            setTestList(allTestsByBlogger);
        }
    }, [allTestsByBlogger]);

    const userState = useAppSelector((state: RootState) => state.user);
    const [ addAnswer, result ]  = useAddAnswerMutation();
    const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));

    useEffect(() => {
      const languageSet = localStorage.getItem('i18nextLng');
      if(userState.language) {
          setLanguage(userState.language);
      } else if(languageSet) {
          setLanguage(languageSet);
      }
    },[userState.language])
    
    const localDemoTest = localStorage.getItem('demoTest');
    useEffect(() => {
        if(localDemoTest) {
            const demoTestParsed = JSON.parse(localDemoTest);
            addAnswer({id: userState.id!, data: demoTestParsed});
            localStorage.removeItem('demoTest');
        }
    },[])

    // TOTALPOINT CALC FUNCTION 
    // useEffect(() => {
    //     if(testList) {
    //         let maxPointfromEveryQuestion: number[] = [];
    //         testList[0].questions.forEach((question) => {
    //             // one question 
    //             let pointsFromOneAnswer: number[] = [];
    //             for (let i = 0; i < question.answers.length; i++) {
    //                 pointsFromOneAnswer.push(+question.answers[i].points)
    //             }
    //             pointsFromOneAnswer.sort();
    //             maxPointfromEveryQuestion.push(pointsFromOneAnswer[question.answers.length - 1]);
    //         })
    //         const totalPoints = maxPointfromEveryQuestion.reduce((totalPoints, maxPoints) => totalPoints + maxPoints);
    //     }
    // }, [testList])

    const { data, isLoading, isError, error } = useFetchAnswersQuery(userState.id!);

    return (
        <Container
            justifyContent='flex-start'
            backgroundColor='#212529'
            locked={false}
        >
            {(userState.name) && (userState.email) && (
                <ProfileHeader 
                    marginTop={'6rem'}
                    photoUrl={userState.photoUrl ? userState.photoUrl : ''} 
                    name={userState.name} 
                    description={userState.email}
                />
            )}
            {  
                data && 
                testList && testList.map((testItem, index) => {
                    if (data && testItem.id in data) { 
                        // const points = _.get(data, `${testItem.id}.points`);
                        const points = data[testItem.id].points;
                        // const {text, svg} = await fetchVerdict(testItem.id);
                        return (
                            <TestCardPass
                                id={testItem.id}
                                key={index}         
                                testName={(language === 'or') ? testItem.testName.or : testItem.testName.ua}
                                cover={testItem.cover}
                                bloggerName={(language === 'or') ? testItem.blogger.name.or : testItem.blogger.name.ua}
                                bloggerAvatar={testItem.blogger.avatar}
                                points={points}
                                language={language ? language : 'ua'}
                                onClick={() => navigate(`/test/${testItem.id}/result`)}
                            />
                        )
                    } 
                    else {
                        return (
                            <TestCardOpen
                                key={index}
                                testName={(language === 'or') ? testItem.testName.or : testItem.testName.ua}
                                cover={testItem.cover}
                                bloggerName={(language === 'or') ? testItem.blogger.name.or : testItem.blogger.name.ua}
                                bloggerAvatar={testItem.blogger.avatar}
                                footerText={`${(language === 'or') ? 'Вопросов: ' : 'Питань: '} ${testItem.qLength}`}
                                onClick={() => navigate(`/test/${testItem.id}`)}
                            />
                        )
                    }
                }
            )} 
            
        </Container>
    )
}
  
export default ProfilePage;