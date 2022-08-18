import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase.config';
import OAuth from '../../Auth/OAuth';
import BtnGoogleOAuth from '../../Profile/BtnGoogleOAuth/BtnGoogleOAuth';
import TestCardOpen from '../../Profile/TestCard/TestCardOpen/TestCardOpen';
import s from './PreviewCard.module.scss';


export interface PreviewCardProps {
    showText: boolean;
}


const PreviewCard: FC<PreviewCardProps> = ({
    showText
}) => {
    const navigate = useNavigate();
    const [oneTest, setOneTest] = useState<any | undefined>(undefined);
    useEffect(() => {
        const fetchData = async() => {
            const docRef = doc(db, 'tests', 'at-home')
            const getOneTest = await getDoc(docRef);
            if(getOneTest.exists()) { 
                const testData = getOneTest.data();
                setOneTest(testData);
            }
        };
        fetchData();
    }, [])

    const onGoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
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

  return (
    <div className={ (showText) ? s.showText : s.hidden}>
        {   (oneTest) &&
                <TestCardOpen
                    testName={oneTest.testName}
                    cover={oneTest.cover}
                    blogger={oneTest.blogger}
                    footerText={'Вхід через Gmail'}
                    onClick={onGoogleClick}
                    button={<BtnGoogleOAuth />}
                />
        } 

        {/* <OAuth /> */}
    </div>
  )
}

export default PreviewCard