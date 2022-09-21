
import React, { useEffect, useState } from 'react';
import ButtonFollow from '../components/Buttons/ButtonFollow/ButtonFollow';
import Container from '../components/Containers/Container/Container';
import s from './SignUp.module.scss';

import googleIcon from '../assets/svg/buttons/google-sign-up.svg';
import coverImg from '../assets/mockups/signup-cover.png';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import InputCode from '../components/Forms/InputCode/InputCode';
import { useDisabledInviteCodeMutation, useValidateInviteCodeQuery } from '../features/blogger/bloggerApi';



const SignUpPage = () => {
  const navigate = useNavigate();3;
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | undefined>(undefined);
  const [isCodeValidated, setIsCodeValidated] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

  const {data: dataValidatedCode } = useValidateInviteCodeQuery(code);
  const [ disabledInviteCode ] = useDisabledInviteCodeMutation();
  
  useEffect( () => {
    if(code && dataValidatedCode?.validated === false) {
      setIsValid(false);
    } else if (code && dataValidatedCode?.validated 
      && dataValidatedCode?.id
    ) {
      setIsCodeValidated(true);
      setIsValid(true);
      disabledInviteCode(dataValidatedCode.id);
    } 
  }, [code, dataValidatedCode]);



  const signupGoogleHandler = async () => {
    if(isValid) {
      try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Check for user
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        // If user, doesn't exist, create user 
        if(!docSnap.exists()) {
          await setDoc(doc(db, 'users', user.uid), {
            name: user.displayName,
            email: user.email,
          });
        }
        navigate('/create');
      } catch (error) {
        console.error('Could not authorize with Google');
      }
    } else {
      setIsValid(false);
      setTimeout(() => setIsValid(undefined), 1000);
    }
  };

  return (
    <Container
      justifyContent='flex-start'
      backgroundColor='#212529'
      locked={false}
    >
      <div className={s.justifyCenter}>
        <img className={s.imgCover} src={coverImg} />
        <div style={{ marginBottom: '1rem'}}/>
        <p className={s.subtitle}>
        For girls & For men
        </p>
        <div style={{ marginBottom: '0.2rem'}}/>
        <h1 className={s.mainTitle}>
         Create Your Pics Games 🔞 <br/>& Make money on your fans 🤩
        </h1>
        <div 
          style={{ 
            display: 'flex', 
            marginTop: '2rem',
            justifyContent: 'center',
          }}
        >
          <InputCode
            length={6}
            label="INVITE CODE:"
            loading={loading}
            onComplete={(code: any) => {
              setCode(code);
              setLoading(true);
              setTimeout(() => setLoading(false), 
                isValid ? 5000 : 1000);
            }}
            isValid={isValid}
            setIsValid={setIsValid}
          />
          {/* FRAME BORDER*/}
          <div className={s.lockFrameBorder}></div>
        </div>
        <div style={{ marginBottom: '1rem'}}/>
        
        <div
          style={{
            display: 'flex',
            // width: '82%',
            width: '29rem',
            alignSelf: 'center',
          }}
        >
          <ButtonFollow 
            icon={googleIcon}
            sizeBtn={'big'}
            fill={true}
            caption={'Create Account with Google'}
            onClick={signupGoogleHandler}
          /> 
        </div>
      </div>
    </Container>
  );
};

export default SignUpPage;