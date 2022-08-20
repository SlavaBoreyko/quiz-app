import { useEffect, useState } from 'react';
// import Container from '../components/Containers/Container/Container';
import ProfileHeader from '../components/Profile/ProfileHeader/ProfileHeader';
import { TestType } from '../types/test.types';
import { useNavigate } from 'react-router-dom';

// REDUX-TOOLKIT
import { useAddAnswerMutation, useFetchAnswersQuery, useFetchVerdictQuery } from '../features/user/userApi'
import { useAppDispatch, useAppSelector } from '../app/hooks';
// import { setUser2 } from '../features/user/userSlice'

// FIREBASE
import { doc, collection, serverTimestamp, addDoc, getDoc, getDocs, } from 'firebase/firestore'
import { db } from '../firebase.config';
import { RootState } from '../app/store';
import Container from '../components/Containers/Container/Container';
import TestCardPass from '../components/Profile/TestCard/TestCardPass/TestCardPass';
import TestCardOpen from '../components/Profile/TestCard/TestCardOpen/TestCardOpen';

const _ = require('lodash');

export interface setDemoTest {
    idTest: string;
    points: number;
}


const ProfilePage = () => {
    const navigate = useNavigate();
    const [testList, setTestList] = useState<TestType[] | undefined>(undefined);
    
    const userState = useAppSelector((state: RootState) => state.user);
    const [ addAnswer, result ]  = useAddAnswerMutation();

    const [language, setLanguage] = useState('ua');
    useEffect(() => {
        const languageSet = localStorage.getItem('i18nextLng');
        languageSet && setLanguage(languageSet);
    },[]);
    
    const localDemoTest = localStorage.getItem('demoTest');
    useEffect(() => {
        if(localDemoTest) {
            const demoTestParsed = JSON.parse(localDemoTest);
            addAnswer({id: userState.id!, data: demoTestParsed});
            localStorage.removeItem('demoTest');
        }
    },[])

    useEffect(() => {
        const fetchData = async() => {
            //FIREBASE
            const getList = await getDocs(collection(db, 'tests'),)
            let testListBase: TestType[] | any = [];
            getList.forEach((doc) => testListBase.push({id: doc.id, ...doc.data()}));
            setTestList(testListBase);
        };
        fetchData();


    }, [])

    useEffect(() => {
        if(testList) {
            let maxPointfromEveryQuestion: number[] = [];
            testList[0].questions.forEach((question) => {
                // one question 
                let pointsFromOneAnswer: number[] = [];
                for (let i = 0; i < question.answers.length; i++) {
                    pointsFromOneAnswer.push(+question.answers[i].points)
                }
                pointsFromOneAnswer.sort();
                maxPointfromEveryQuestion.push(pointsFromOneAnswer[question.answers.length - 1]);
            })
            const totalPoints = maxPointfromEveryQuestion.reduce((totalPoints, maxPoints) => totalPoints + maxPoints);
            // console.log('>>> maxPointfromEveryQuestion', maxPointfromEveryQuestion);
            // console.log('>>> totalPoints', totalPoints)
        }
    }, [testList])

    const { data, isLoading, isError, error } = useFetchAnswersQuery(userState.id!);

    // console.log('data useFetchAnswersQuery', data);
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
                                onClick={() => navigate(`/test/${testItem.id}/result`)}
                            />
                        )
                    } 
                    else if (testItem.id !== 'test-xtivki-one' && testItem.id !== 'relationship-level') {
                        return (
                            <TestCardOpen
                                key={index}
                                testName={(language === 'or') ? testItem.testName.or : testItem.testName.ua}
                                cover={testItem.cover}
                                bloggerName={(language === 'or') ? testItem.blogger.name.or : testItem.blogger.name.ua}
                                bloggerAvatar={testItem.blogger.avatar}
                                footerText={`${(language === 'or') ? 'Вопросов: ' : 'Питань: '} ${testItem.questions.length}`}
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