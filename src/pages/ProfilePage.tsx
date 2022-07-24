import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import ProfileHeader from '../components/Profile/ProfileHeader/ProfileHeader';
import PassedTestCard from '../components/Profile/PassedTestCard/PassedTestCard';
import NewTestCard from '../components/Profile/NewTestCard/NewTestCard';
import ProfileSection from '../components/Profile/ProfileSection/ProfileSection'; 
import {DemoTestType, UserAnswersType} from '../types/user.types';
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
const _ = require('lodash');

const ProfilePage = () => {
    const navigate = useNavigate();
    
    const [testList, setTestList] = useState<TestType[] | undefined>(undefined)
    
     const userState = useAppSelector((state: RootState) => state.user);

     const [ addAnswer, result ]  = useAddAnswerMutation();
    console.log('> userState ', userState)
    
    useEffect(() => {
        if(userState.demo) {
            addAnswer(userState.demo);
        }
    },[])

    const { data, isLoading, isError, error } = useFetchAnswersQuery();

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

    return (
    <Container img='' justifyContent='flex-start'>
        {(userState.name) && (userState.email)  && (
            <ProfileHeader name={userState.name} email={userState.email}/>
        )}
        {data && testList && testList.map((testItem, index) => {
            if (testItem.id in data) { 
                const points = _.get(data, `${testItem.id}.points`);
                // const {text, svg} = await fetchVerdict(testItem.id);
                return (
                    <PassedTestCard 
                        key={index}             
                        id={testItem.id} 
                        testName={testItem.testName}
                        cover={testItem.questions[0].img}
                        points={points}
                        onClick={() => navigate(`/test/${testItem.id}/result`)}
                    />
                )
            } else {
                return (
                    <NewTestCard 
                        key={index}
                        id={testItem.id}
                        title={testItem.testName}
                        length={testItem.questions.length}
                        onClick={() => navigate(`/test/${testItem.id}`)}
                    />
                )
            }
        })} 
        
        {/* <ProfileSection title={'Тести'} > */}
        {/* Subcategory: relathionship, dating, business */}
        {/* </ProfileSection> */}
    </Container>
    )
}
  
export default ProfilePage;