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
            console.log('>>> maxPointfromEveryQuestion', maxPointfromEveryQuestion);
            console.log('>>> totalPoints', totalPoints)
        }
    }, [testList])

    const { data, isLoading, isError, error } = useFetchAnswersQuery(userState.id!);

    return (
        <>
     <Container
        justifyContent='flex-start'
        backgroundColor='#212529'
    >
        {(userState.name) && (userState.email) && (
            <ProfileHeader 
                photoUrl={userState.photoUrl ? userState.photoUrl : ''} 
                name={userState.name} 
                email={userState.email}
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
                            testName={testItem.testName}
                            cover={testItem.cover}
                            blogger={testItem.blogger}
                            points={points}
                            onClick={() => navigate(`/test/${testItem.id}/result`)}
                        />
                    )
                } else {
                    return (
                        <TestCardOpen
                            key={index}
                            testName={testItem.testName}
                            cover={testItem.cover}
                            blogger={testItem.blogger}
                            length={testItem.questions.length}
                            onClick={() => navigate(`/test/${testItem.id}`)}
                        />
                    )
                }
            }
        )} 
        
        {/* <ProfileSection title={'Тести'} > */}
        {/* Subcategory: relathionship, dating, business */}
        {/* </ProfileSection> */}
    </Container>
    </>
    )
}
  
export default ProfilePage;