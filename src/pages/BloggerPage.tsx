/* eslint-disable no-irregular-whitespace */
import { Skeleton } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import BloggersHeader from '../components/Bloggers/BloggersHeader/BloggersHeader';
import Container from '../components/Containers/Container/Container';
import ButtonPlay from '../components/Buttons/ButtonPlay/ButtonPlay';
import TestCardOpen from '../components/Profile/TestCard/TestCardOpen/TestCardOpen';
import { useFetchBloggerQuery, useFollowingMutation } from '../features/blogger/bloggerApi';
import { useFetchTestsByBloggerIdQuery } from '../features/test/testApi';
import { useFetchFollowingListQuery, useFollowMutation, useUnfollowMutation } from '../features/user/userApi';
import { db } from '../firebase.config';
import { BloggerBigType, TestCardType } from '../types/test.types';
import ButtonPrice from '../components/Buttons/ButtonPrice/ButtonPrice';
import openInNewTab from '../utils/openInNewTab';
import BtnEmail from '../components/Buttons/BtnEmail/BtnEmail';
import FooterPolicy from '../components/Footers/FooterPolicy';
import SubcriptionCard from '../components/Profile/TestCard/SubcriptionCard/SubcriptionCard';

const BloggerPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [blogger, setBlogger] = useState<BloggerBigType | undefined>(undefined);
  const { data: bloggerData } = useFetchBloggerQuery(params.id!);

  const userState = useAppSelector((state: RootState) => state.user);
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
  const { data: followingList } = useFetchFollowingListQuery(userState.id!);
  const [followingState, setFollowingState] = useState<boolean>(false);
  // console.log('followingList', followingList)
  const { data: allTestsByBlogger }  = useFetchTestsByBloggerIdQuery(params.id!);
  const [testList, setTestList] = useState<TestCardType[] | undefined>(undefined);

  // Follow
  const [ follow ]  = useFollowMutation();
  const [ unfollow ] = useUnfollowMutation();

  const [ following ] = useFollowingMutation();

  useEffect(() => {
    if(followingList && blogger && followingList.includes(blogger.id)) {
      setFollowingState(true);
    }
  },[followingList, blogger]);

  useEffect(() => {
    const languageSet = localStorage.getItem('i18nextLng');
    if(userState.language) {
      setLanguage(userState.language);
    } else if(languageSet) {
      setLanguage(languageSet);
    }
  },[userState.language]);

  // console.log(bloggerData)
  useEffect(() => {
    if(bloggerData) {
      setBlogger(bloggerData);
    }
  },[bloggerData]);

  // FOR NEXT SORT 
  useEffect(() => {
    if(allTestsByBlogger) {
      setTestList(allTestsByBlogger);
    }
  }, [allTestsByBlogger]);

  const followHandler = (action: 'follow' | 'unfollow') => {
    if((action === 'follow') && (userState.id) && (blogger)) {
      follow({id: userState.id, bloggerId: blogger.id});
      following({ id: blogger.id, value: 1 });
      console.log('followHandler: follow');
    }

    if((action === 'unfollow') && (userState.id) && (blogger)) {
      unfollow({id: userState.id, bloggerId: blogger.id});
      following({ id: blogger.id, value: -1 });
      console.log('followHandler: UNFOLLOW');
    } 
  };
  // (userState) && 
  // console.log('userState.following', userState);

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
      if(!docSnap.exists()) {
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
    <Container
      justifyContent='flex-start'
      backgroundColor='#212529'
      locked={false}
    >
      {(blogger) ? (
        <BloggersHeader 
          id={blogger.id}
          key={blogger.id}
          avatar={blogger.avatar}
          name={(language === 'or') ? blogger.name.or  : blogger.name.ua}
          
          mainBlogSoc={blogger.mainBlog.soc} 
          mainBlogName={(language === 'or') ? blogger.mainBlog.or : blogger.mainBlog.ua}
          mainBlogFollowers={blogger.mainBlog.followers}
          mainBlogLink={blogger.mainBlog.link}

          followers={blogger.followers}
          passedTests={blogger.passedTests}
          description={(language === 'or') ? blogger.description.or : blogger.description.ua}
          language={language}
          followHandler={followHandler}
          followingState={followingState}
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
      {/* DEMO SubcriptionCard */}
      {/* {(blogger) ? (
        <>
          <SubcriptionCard
            option={'donation'}
            footerText={(language === 'or') ? 
              '<p>- От $1</p><p>- Месседж блогеру</p>' : 
              '<p>- Від $1</p><p>- Меседж блогеру</p>'
            }
            onClick={(userState.id) && (() => openInNewTab('subscritption.link'))}
            price={'$'} 
          />
          <SubcriptionCard
            option={'subscription'}
            footerText={(language === 'or') ? 
              '<p>- 4 тесты в месяц</p><p>- Флирт-тренажер</p>' : 
              '<p>- 4 тести в місяць</p><p>- Флірт-тренажер</p>'
            }
            onClick={(userState.id) && (() => openInNewTab('subscritption.link'))}
            price={'5$'} 
          />
        </>
      ) : (
        <Skeleton     
          sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
          variant="rounded"  
          animation="wave"  
          width={'100%'} 
          height={'8rem'} 
        />
      )} */}
      { testList ? testList.map((test, index) => (
        <TestCardOpen
          key={test.id}
          testName={(language === 'or') ? test.testName.or : test.testName.ua}
          cover={test.cover}
          bloggerId={test.blogger.id}
          bloggerName={(language === 'or') ? test.blogger.name.or : test.blogger.name.ua}
          bloggerAvatar={test.blogger.avatar}
          footerText={
            (test.payment === 'free' && userState.id) ? 
              `${(language === 'or') ? 'Вопросов: ' : 'Питань: '} ${test.qLength}` :
              (test.payment !== 'free' && userState.id) ? 
                `${(language === 'or') ? 'Платный тест ' : 'Платний тест '}` :
                `${(language === 'or') ? 'Вход через email' : 'Вхід через email'}`
          }
          onClick={
            (test.payment === 'free' && userState.id) ? () => navigate(`/test/${test.id}`) : 
              (test.payment !== 'free' && userState.id) ? (() => openInNewTab(test.payment)) :
                onGoogleClick 
          }
          button={(test.payment === 'free' && userState.id) ? <ButtonPlay width={'22%'}/> : 
            (test.payment !== 'free' && userState.id) ? 
              <ButtonPrice 
                price={test.price} 
                onClick={(e: any) => {
                  e.stopPropagation();
                  openInNewTab(test.payment);
                }}
              /> : 
              <BtnEmail />
          }
        />
      )) : (
        <Skeleton     
          sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
          variant="rounded"  
          animation="wave"  
          width={'100%'} 
          height={'15rem'} 
        />
      )}
      <FooterPolicy language={language} />
    </Container>
  );
};

export default BloggerPage;