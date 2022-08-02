import { useEffect, useState } from 'react';
import Container from '../components/Containers/Container/Container';
import TestCard from '../components/Profile/TestCard/TestCard';
import { TestType } from '../types/test.types';
import { useNavigate } from 'react-router-dom';

// REDUX-TOOLKIT

// FIREBASE
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config';
import ProfileSection from '../components/Profile/ProfileSection/ProfileSection';
import TestCardLock from '../components/Profile/TestCard/TestCardLock/TestCardLock';
import TestCardOpen from '../components/Profile/TestCard/TestCardOpen/TestCardOpen';

const SignInPromo = () => {
    const navigate = useNavigate();
    const [oneTest, setOneTest] = useState<any | undefined>(undefined);
    const [oneTest2, setOneTest2] = useState<any | undefined>(undefined);

    useEffect(() => {
        const fetchData = async() => {
            const docRef = doc(db, 'tests', 'at-home')
            const getOneTest = await getDoc(docRef);
            if(getOneTest.exists()) { 
                const testData = getOneTest.data();
                setOneTest(testData);
            }

            const docRef2 = doc(db, 'tests', 'test-xtivki-one')
            const getOneTest2 = await getDoc(docRef2);
            if(getOneTest.exists()) { 
                const testData2 = getOneTest2.data();
                setOneTest2(testData2);
            }
        };
        fetchData();
    }, [])

    return (
        <>
        <Container
            justifyContent='flex-start'
            backgroundColor='#212529'
        > 

        <ProfileSection title={'Тести від блогерів'} />
        {   (oneTest) &&
            <TestCardOpen
                testName={oneTest.testName}
                cover={oneTest.cover}
                blogger={oneTest.blogger}
                length={oneTest.questions.length}
                onClick={() => navigate(`/test/${oneTest.id}`)}
            />
        }    
        <ProfileSection title={'Хтивки-тести'} />
        {   (oneTest2) &&
            <TestCardLock
                testName={oneTest2.testName}
                cover={oneTest2.cover}
                blogger={oneTest2.blogger}
                length={oneTest2.questions.length}
                onClick={() => navigate(`/test/${oneTest2.id}`)}
            />
        }   
        
        {/* <ProfileSection title={'Тести'} > */}
        {/* Subcategory: relathionship, dating, business */}
        {/* </ProfileSection> */}
        </Container>
        </>
    )
}
  
export default SignInPromo;