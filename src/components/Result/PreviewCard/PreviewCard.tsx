/* eslint-disable no-irregular-whitespace */
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase.config';
import BtnGoogleOAuth from '../../Buttons/BtnGoogleOAuth/BtnGoogleOAuth';
import s from './PreviewCard.module.scss';
import TestCard from '../../Profile/TestCard/TestCard';
import { TestCardBody } from '../../Profile/TestCard/TestCardBody/TestCardBody';

export interface PreviewCardProps {
  showText: boolean;
}

const PreviewCard: FC<PreviewCardProps> = ({ showText }) => {
  const navigate = useNavigate();
  const [oneTest, setOneTest] = useState<any | undefined>(undefined);

  const [language, setLanguage] = useState('ua');
  useEffect(() => {
    const languageSet = localStorage.getItem('i18nextLng');
    languageSet && setLanguage(languageSet);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'tests', 'at-home');
      const getOneTest = await getDoc(docRef);
      if (getOneTest.exists()) {
        const testData = getOneTest.data();
        setOneTest(testData);
      }
    };
    fetchData();
  }, []);

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
      navigate('/divertito');
    } catch (error) {
      console.error('Could not authorize with Google');
    }
  };

  return (
    <div className={showText ? s.showText : s.hidden}>
      {oneTest && (
        <TestCard
          key={oneTest.id}
          cover={oneTest.cover}
          onClick={() => navigate(`/test/${oneTest.id}/1`)}
        >
          <TestCardBody
            blogger={oneTest.blogger}
            testName={oneTest.testName.ua}
            footerText="Вхід через Gmail*"
          >
            <BtnGoogleOAuth />
          </TestCardBody>
        </TestCard>
      )}
      {/* <OAuth /> */}
      <div
        style={{
          color: '#adb5bdaa',
          fontSize: '1.2rem',
          marginTop: '1rem',
        }}
      >
        {language === 'or' ? (
          <>
            *Пользуясь сайтом, вы принимаете правила
            <a
              href={require('../../../assets/pdf/privacy-policy.pdf')}
              target="blank"
              style={{
                color: '#adb5bd',
              }}
            >
              {' '}
              Политики конфиденциальности.
            </a>
          </>
        ) : (
          <>
            *Користуючись сайтом, ви приймаєте правила
            <a
              href={require('../../../assets/pdf/privacy-policy.pdf')}
              target="blank"
              style={{
                color: '#adb5bd',
              }}
            >
              {' '}
              Політики конфіденційності.
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default PreviewCard;
