import { Skeleton } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import BloggersHeader from '../components/Bloggers/BloggersHeader/BloggersHeader';
import Container from '../components/Containers/Container/Container';
import BtnGoogleOAuth from '../components/Profile/BtnGoogleOAuth/BtnGoogleOAuth';
import ButtonPlay from '../components/Profile/ButtonPlay/ButtonPlay';
import TestCardOpen from '../components/Profile/TestCard/TestCardOpen/TestCardOpen';
import { useFetchBloggerQuery } from '../features/blogger/bloggerApi';
import { useFetchTestsByBloggerQuery } from '../features/test/testApi';
import { db } from '../firebase.config';
import { TestCardType } from '../types/test.types';

const BloggerPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [blogger, setBlogger] = useState<any | undefined>(undefined)
    const { data: bloggerData, isLoading, isError, error } = useFetchBloggerQuery(params.id!);

    const userState = useAppSelector((state: RootState) => state.user);
    const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
    
    const { data: allTestsByBlogger }  = useFetchTestsByBloggerQuery('Фан-клуб Дівертіто');
    const [testList, setTestList] = useState<TestCardType[] | undefined>(undefined);

    useEffect(() => {
      const languageSet = localStorage.getItem('i18nextLng');
      if(userState.language) {
          setLanguage(userState.language);
      } else if(languageSet) {
          setLanguage(languageSet);
      }
    },[userState.language])

    // console.log(bloggerData)
    useEffect(() => {
        if(bloggerData) {
          setBlogger(bloggerData);
        }
    },[bloggerData])

    // FOR NEXT SORT 
    useEffect(() => {
        if(allTestsByBlogger) {
            setTestList(allTestsByBlogger);
        }
    }, [allTestsByBlogger]);


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

  return (
    <Container
      justifyContent='flex-start'
      backgroundColor='#212529'
      locked={false}
    >
      {(blogger) ? (
        <BloggersHeader 
          id={blogger.id}
          avatar={blogger.avatar}
          name={blogger.name.ua}
          followers={blogger.followers}
          passedTests={blogger.passedTests}
          description={blogger.description.ua}
        /> 
      ) : (
        <Skeleton 
          sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
          variant="rounded"  
          animation="wave"  
          width={'100%'} 
          height={'15rem'} 
        />
      )}
      { testList ? testList.map((test, index) => (
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
        )) : (
            <Skeleton 
                sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
                variant="rounded"  
                animation="wave"  
                width={'100%'} 
                height={'15rem'} 
            />
        )
      }
    </Container>
  )
}

export default BloggerPage