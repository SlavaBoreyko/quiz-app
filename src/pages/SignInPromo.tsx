import { Suspense, useEffect, useState } from 'react';
import Container from '../components/Containers/Container/Container';
import s from '../components/Profile/TestCard/TestCard.module.scss';
import { useNavigate } from 'react-router-dom';
import statusMockImg from '../assets/test-images/status-mock-2.png'
import MyLogo from '../assets/svg/logo-testroom.svg'
import MyLogo2 from '../assets/svg/logo-testroom-2.svg'
import logo from '../assets/test-images/logo-4-message.png';

// REDUX-TOOLKIT

// FIREBASE
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase.config';
import ProfileSection from '../components/Profile/ProfileSection/ProfileSection';
import TestCardLock from '../components/Profile/TestCard/TestCardLock/TestCardLock';
import TestCardOpen from '../components/Profile/TestCard/TestCardOpen/TestCardOpen';
import OAuth from '../components/Auth/OAuth';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import BtnGoogleOAuth from '../components/Profile/BtnGoogleOAuth/BtnGoogleOAuth';
import ButtonPlay from '../components/Profile/ButtonPlay/ButtonPlay';

// Translation
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../app/hooks';

// const translationsUA = {
//     descriptionPlatform: `Дізнайся, наскільки ти засвоїв "матеріал" і які відео рекомендовано передивитись. 
//     А також отримуй "сертифікацію" своїx навиків:`
// }
// const translationsOR = {
//     descriptionPlatform: `Узнай, насколько ты усвоил "материал" и какие видео рекомендуется посмотреть.
//     А также получай "сертификацию" своих навыков:`
// }



const SignInPromo = () => {
    // const { t } = useTranslation();
    const navigate = useNavigate();
    const [oneTest, setOneTest] = useState<any | undefined>(undefined);
    const [oneTest2, setOneTest2] = useState<any | undefined>(undefined);
    // const [oneTest3, setOneTest3] = useState<any | undefined>(undefined);
    
    const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
    const userState = useAppSelector((state: any) => state.user);
    useEffect(() => {
      const languageSet = localStorage.getItem('i18nextLng');
      if(userState.language) {
          setLanguage(userState.language);
      } else if(languageSet) {
          setLanguage(languageSet);
      }
  },[userState.language])

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            // Check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            // If user, doesn't exist, create user 
            if(!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    // timestamp: serverTimestamp()
                })
            }
            navigate('/profile');
        } catch (error) {
            console.error('Could not authorize with Google')
        }
    }

    useEffect(() => {
        const fetchData = async() => {
            const docRef = doc(db, 'tests', 'first-date')
            const getOneTest = await getDoc(docRef);
            if(getOneTest.exists()) { 
                const testData = getOneTest.data();
                setOneTest(testData);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async() => {
            const docRef2 = doc(db, 'tests', 'at-home')
            const getOneTest2 = await getDoc(docRef2);
            if(getOneTest2.exists()) { 
                const testData2 = getOneTest2.data();
                setOneTest2(testData2);
            }
        }
        fetchData();
    }, [])

    // const onChangeLanguage = (e: any) => {
    //     i18n.changeLanguage(e.target.value);
    // }

    return (
        <Suspense fallback="Loading...">
        <Container
            justifyContent='flex-start'
            backgroundColor='#212529'
            locked={false}
        > 
            <ProfileSection title={(language === 'or') ? 'Тесты' : 'Тести'} 
                // description={t('descriptionPlatform')}
                description={(language === 'or') ? `Узнай, насколько ты усвоил "материал" и какие видео рекомендуется посмотреть.
                     А также получай "сертификацию" своих навыков:`:
                    `Дізнайся, наскільки ти засвоїв "матеріал" і які відео рекомендовано передивитись. 
                    А також отримуй "сертифікацію" своїx навиків:`
                }
            >
            {   (oneTest) &&
                <TestCardOpen
                    testName={(language === 'or') ? oneTest.testName.or : oneTest.testName.ua}
                    cover={oneTest.cover}
                    bloggerName={(language === 'or') ? oneTest.blogger.name.or : oneTest.blogger.name.ua}
                    bloggerAvatar={oneTest.blogger.avatar}
                    footerText={`${(language === 'or') ? 'Вопросов: ' : 'Питань: '} ${oneTest.questions.length}`}
                    onClick={() => navigate(`/test/${oneTest.id}`)}
                    button={<ButtonPlay width={'22%'}/>}
                />
            } 
            
            </ProfileSection>
            {/* Mock */}
            <img 
                style={{
                    border: '1px solid #F59F00',
                    borderRadius: '0.5rem',
                    width: '100%',
                    marginBottom: '4rem',
                }} 
                src={statusMockImg} 
                alt="Mock status screen"
            />

             {   (oneTest2) &&
                <TestCardOpen
                    testName={(language === 'or') ? oneTest2.testName.or : oneTest2.testName.ua}
                    cover={oneTest2.cover}
                    bloggerName={(language === 'or') ? oneTest2.blogger.name.or : oneTest2.blogger.name.ua}
                    bloggerAvatar={oneTest2.blogger.avatar}
                    footerText={`${(language === 'or') ? 'Вопросов: ' : 'Питань: '} ${oneTest2.questions.length}`}
                    onClick={onGoogleClick}
                    button={<BtnGoogleOAuth  width={'22%'}/>}
                />
            }   
            {/*
            {   (oneTest3) &&
                <TestCardOpen
                    testName={oneTest3.testName}
                    cover={oneTest3.cover}
                    blogger={oneTest3.blogger}
                    footerText={`Питань: ${oneTest3.questions.length}`}
                    onClick={onGoogleClick}
                    button={<BtnGoogleOAuth  width={'24%'}/>}
                />
            }    */}

            {/* <ProfileSection title={'Хтивки-тести'} 
                description={
                    'Інсайти у флірті, звабленні та технікам сексу у форматі ігрового тесту з хтивками-відкривашками від секс-блогерш.'
                }
            >
            {   (oneTest2) &&
                <TestCardLock
                    testName={oneTest2.testName}
                    cover={oneTest2.cover}
                    blogger={oneTest2.blogger}
                    length={oneTest2.questions.length}
                    onClick={onGoogleClick}
                    button={<BtnGoogleOAuth  width={'24%'}/>}
                />
            }   
            </ProfileSection> */}

            {/* <div>
                <OAuth />
            </div> */}
        </Container>
        </Suspense>
    )
}
  
export default SignInPromo;