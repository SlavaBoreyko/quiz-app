/* eslint-disable max-len */
/* eslint-disable no-irregular-whitespace */
import React, { useEffect, useState } from 'react';
import Container from '../components/Containers/Container/Container';
import { useNavigate } from 'react-router-dom';
import statusMockImg from '../assets/test-images/status-mock-2.png';
import statusMockImgOR from '../assets/test-images/or-status-screen.png';
// import PolicyPDF from '../assets/pdf/privacy-policy.pdf';
import Skeleton from '@mui/material/Skeleton';

// FIREBASE
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import ProfileSection from '../components/Profile/ProfileSection/ProfileSection';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import BtnGoogleOAuth from '../components/Buttons/BtnGoogleOAuth/BtnGoogleOAuth';
import ButtonPlay from '../components/Buttons/ButtonPlay/ButtonPlay';

// Translation
import { TestCardType } from '../types/test.types';
import { useAppSelector } from '../app/hooks';
import { useFetchTestsByBloggerIdQuery } from '../features/test/testApi';
import FooterPolicy from '../components/Footers/FooterPolicy';
import TestCard from '../components/Profile/TestCard/TestCard';
import { TestCardBody } from '../components/Profile/TestCard/TestCardBody/TestCardBody';

const SignInPromo = () => {
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
  const userState = useAppSelector((state: any) => state.user);

  const { data: allTestsByBlogger } =
    useFetchTestsByBloggerIdQuery('divertito');
  const [testDemo, setTestDemo] = useState<TestCardType | undefined>(undefined);
  const [otherTests, setOtherTests] = useState<TestCardType[] | undefined>(
    undefined,
  );

  useEffect(() => {
    if (allTestsByBlogger) {
      const test = allTestsByBlogger.filter(
        (test: any) => test.id === 'first-date',
      );
      const otherTests = allTestsByBlogger.filter(
        (test: any) => test.id !== 'first-date',
      );
      setTestDemo(test[0]);
      setOtherTests(otherTests);
    }
  }, [allTestsByBlogger]);

  useEffect(() => {
    const languageSet = localStorage.getItem('i18nextLng');
    if (userState.language) {
      setLanguage(userState.language);
    } else if (languageSet) {
      setLanguage(languageSet);
    }
  }, [userState.language]);

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          // timestamp: serverTimestamp()
        });
      }
      navigate('/');
    } catch (error) {
      console.error('Could not authorize with Google');
    }
  };

  // const onChangeLanguage = (e: any) => {
  //     i18n.changeLanguage(e.target.value);
  // }

  // ANALYTICS
  useEffect(() => {
    const fetchUsersActivities = async () => {
      // const testName = 'first-date';

      const q = query(collection(db, 'users'), where(`answers`, '!=', null));

      const querySnapshot = await getDocs(q);

      ['first-date', 'at-home', 'relationship-level'].forEach((testName) => {
        let counter = 0;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // if (data.answers[testName] && data.answers[testName]['points'] >= 51) {

          if (data.answers[testName] && data.answers[testName]['points'] >= 0) {
            // if (Object.keys(data.answers).length === 3) {
            counter++;
          }
        });
        console.log(testName, ' ', counter);
      });
    };
    fetchUsersActivities();
  }, []);

  return (
    <Container
      justifyContent="flex-start"
      backgroundColor="#212529"
      locked={false}
    >
      <ProfileSection
        title={language === 'or' ? 'Тесты' : 'Тести'}
        // description={t('descriptionPlatform')}
        description={
          language === 'or'
            ? `Узнай, насколько ты усвоил "материал" и какие видео рекомендуется посмотреть.
                     А также получай "сертификацию" своих навыков:`
            : `Дізнайся, наскільки ти засвоїв "матеріал" і які відео рекомендовано передивитись. 
                    А також отримуй "сертифікацію" своїx навиків:`
        }
      >
        {testDemo ? (
          <TestCard
            key={testDemo.id}
            cover={testDemo.cover}
            onClick={() => navigate(`/test/${testDemo.id}/1`)}
          >
            <TestCardBody
              blogger={testDemo.blogger}
              testName={testDemo.testName.ua}
              footerText={`Питань: ${testDemo.qLength}`}
            >
              <ButtonPlay width={'22%'} />
            </TestCardBody>
          </TestCard>
        ) : (
          // ))
          <Skeleton
            sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
            variant="rounded"
            animation="wave"
            width={'100%'}
            height={'15rem'}
          />
        )}
      </ProfileSection>
      {/* Mock */}
      <img
        style={{
          border: '1px solid #F59F00',
          borderRadius: '0.5rem',
          width: '100%',
          marginBottom: '4rem',
        }}
        src={language === 'or' ? statusMockImgOR : statusMockImg}
        alt="Mock status screen"
      />

      {otherTests ? (
        otherTests.map((test: any) => (
          <TestCard
            key={test.id}
            cover={test.cover}
            onClick={() => navigate(`/test/${test.id}/1`)}
          >
            <TestCardBody
              blogger={test.blogger}
              testName={test.testName.ua}
              footerText={`Питань: ${test.qLength}`}
            >
              <ButtonPlay width={'22%'} />
            </TestCardBody>
          </TestCard>
        ))
      ) : (
        <Skeleton
          sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
          variant="rounded"
          animation="wave"
          width={'100%'}
          height={'15rem'}
        />
      )}
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
      <FooterPolicy language={language} />
    </Container>
  );
};

export default SignInPromo;
