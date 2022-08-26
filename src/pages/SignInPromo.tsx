import { Suspense, useEffect, useState } from 'react';
import Container from '../components/Containers/Container/Container';
import s from '../components/Profile/TestCard/TestCard.module.scss';
import { useNavigate } from 'react-router-dom';
import statusMockImg from '../assets/test-images/status-mock-2.png';
import statusMockImgOR from '../assets/test-images/or-status-screen.png';
// import PolicyPDF from '../assets/pdf/privacy-policy.pdf'; 
import Skeleton from '@mui/material/Skeleton';

// FIREBASE
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore'
import { db } from '../firebase.config';
import ProfileSection from '../components/Profile/ProfileSection/ProfileSection';
import TestCardLock from '../components/Profile/TestCard/TestCardLock/TestCardLock';
import TestCardOpen from '../components/Profile/TestCard/TestCardOpen/TestCardOpen';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import BtnGoogleOAuth from '../components/Profile/BtnGoogleOAuth/BtnGoogleOAuth';
import ButtonPlay from '../components/Profile/ButtonPlay/ButtonPlay';

// Translation
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../app/hooks';
import { useFetchTestsByBloggerQuery } from '../features/test/testApi';
import { TestCardType } from '../types/test.types';

const SignInPromo = () => {
    // const { t } = useTranslation();
    const navigate = useNavigate();    
    const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
    const userState = useAppSelector((state: any) => state.user);

    const { data: allTestsByBlogger, isLoading, isError, error }  = useFetchTestsByBloggerQuery('Фан-клуб Дівертіто');
    const [testDemo, setTestDemo] = useState<TestCardType | undefined>(undefined);
    const [otherTests, setOtherTests] = useState<TestCardType[] | undefined>(undefined);

    useEffect(() => {
        if(allTestsByBlogger) {
            const test = allTestsByBlogger.filter((test: any) => test.id === 'first-date');
            const otherTests = allTestsByBlogger.filter((test: any) => test.id !== 'first-date');
            setTestDemo(test[0]);
            setOtherTests(otherTests);
        }
    }, [allTestsByBlogger])

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
            navigate('/');
        } catch (error) {
            console.error('Could not authorize with Google')
        }
    }

    // const onChangeLanguage = (e: any) => {
    //     i18n.changeLanguage(e.target.value);
    // }

    // ANALYTICS
    useEffect(() => {
        const fetchUsersActivities = async() => {
            // const testName = 'first-date';

            const q = query(collection(db, "users"), where(`answers`, "!=", null));
            
            const querySnapshot = await getDocs(q);

            ['first-date', 'at-home', 'relationship-level'].forEach((testName) => {
                let counter = 0;
                querySnapshot.forEach((doc) => {
                    const data = doc.data()
                    // if (data.answers[testName] && data.answers[testName]['points'] >= 51) {
                    
                    if (data.answers[testName] && data.answers[testName]['points'] >= 0) {
                    // if (Object.keys(data.answers).length === 3) {
                        counter++
                    }
                });
                console.log(testName, ' ', counter);
            })
            
        }
        fetchUsersActivities();
    }, [])
    
    return (
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
            { (testDemo) ? (
                // allTestsByBlogger.slice(0,1).map((test: any) => (
                    <TestCardOpen
                        key={testDemo.id} 
                        testName={(language === 'or') ? testDemo.testName.or : testDemo.testName.ua}
                        cover={testDemo.cover}
                        bloggerId={testDemo.blogger.id}
                        bloggerName={(language === 'or') ? testDemo.blogger.name.or : testDemo.blogger.name.ua}
                        bloggerAvatar={testDemo.blogger.avatar}
                        footerText={(userState.id) ? `${(language === 'or') ? 'Вопросов: ' : 'Питань: '} ${testDemo.qLength}` :
                            `${(language === 'or') ? 'Вход через Gmail*' : 'Вхід через Gmail*'}`
                        }
                        onClick={(userState.id) ? () => navigate(`/test/${testDemo.id}`) : onGoogleClick }
                        button={(userState.id) ? <ButtonPlay width={'22%'}/> : <BtnGoogleOAuth  width={'22%'}/>}
                    />
                // ))
                ) : (
                    <Skeleton 
                        sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
                        variant="rounded"  
                        animation="wave"  
                        width={'100%'} 
                        height={'15rem'} 
                    />
                )
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
                src={(language === 'or') ? statusMockImgOR : statusMockImg} 
                alt="Mock status screen"
            />

            { (otherTests) ? (
                otherTests.map((test: any) => (
                    <TestCardOpen
                        key={test.id}
                        testName={(language === 'or') ? test.testName.or : test.testName.ua}
                        cover={test.cover}
                        bloggerId={test.blogger.id}
                        bloggerName={(language === 'or') ? test.blogger.name.or : test.blogger.name.ua}
                        bloggerAvatar={test.blogger.avatar}
                        footerText={(userState.id) ? `${(language === 'or') ? 'Вопросов: ' : 'Питань: '} ${test.qLength}` :
                            `${(language === 'or') ? 'Вход через Gmail*' : 'Вхід через Gmail*'}`
                        }
                        onClick={(userState.id) ? () => navigate(`/test/${test.id}`) : onGoogleClick }
                        button={(userState.id) ? <ButtonPlay width={'22%'}/> : <BtnGoogleOAuth  width={'22%'}/>}
                    />
                ))) : (
                    <Skeleton 
                        sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
                        variant="rounded"  
                        animation="wave"  
                        width={'100%'} 
                        height={'15rem'} 
                    />
                )
            }   
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
            <div 
                style={{
                    color: '#adb5bdaa',
                    fontSize: '1.2rem',
                    marginTop: '1rem',
                }}
            >
            {(language === 'or') ? 
            <> 
                *Пользуясь сайтом, вы принимаете правила
                <a  href={require('../assets/pdf/privacy-policy.pdf')} target='blank'
                    style={{
                        color: '#adb5bdd2',
                    }}
                > Политики конфиденциальности.</a>
            </> :
            <>
                *Користуючись сайтом, ви приймаєте правила
                <a href={require('../assets/pdf/privacy-policy.pdf')} target='blank'
                    style={{
                        color: '#adb5bdd2',
                    }}
                > Політики конфіденційності.</a>
            </>
            }
            </div>
        </Container>
    )
}
  
export default SignInPromo;