import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import BloggerCard from '../components/Bloggers/BloggerCard/BloggerCard';
import Container from '../components/Containers/Container/Container';
import { useFetchBloggerListByAudienceQuery, useFollowingMutation } from '../features/blogger/bloggerApi';
// import { useFetchFollowingListQuery, useFollowMutation, useUnfollowMutation } from '../features/user/userApi';
import { BloggerBigType, TestCardType } from '../types/test.types';
import { useFetchTestsCardByAudienceQuery } from '../features/test/testApi';
import TestCardOpen from '../components/Profile/TestCard/TestCardOpen/TestCardOpen';
import BtnGoogleOAuth from '../components/Buttons/BtnGoogleOAuth/BtnGoogleOAuth';
import ButtonPlay from '../components/Buttons/ButtonPlay/ButtonPlay';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import ExploreNavbar from '../components/Explore/ExploreNavbar/ExploreNavbar';
import BtnEmail from '../components/Buttons/BtnEmail/BtnEmail';
import openInNewTab from '../utils/openInNewTab';
import ButtonPrice from '../components/Buttons/ButtonPrice/ButtonPrice';
import FooterPolicy from '../components/Footers/FooterPolicy';

const ExplorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [toggleMenGirls, setToggleMenGirls] = useState<string>(location.pathname.split('/')[2]); //'men' | 'girls'
  const [bloggerForMen, setBloggerForMen] = useState<BloggerBigType[] | undefined>(undefined);
  const [bloggerForGirls, setBloggerForGirls] = useState<BloggerBigType[] | undefined>(undefined);
  const [testsListForMen, setTestsListForMen] = useState<TestCardType[] | undefined>(undefined);
  const [testsListForGirls, setTestsListForGirls] = useState<TestCardType[] | undefined>(undefined);
  const { data: bloggerDataForMen } = useFetchBloggerListByAudienceQuery('men');
  const { data: bloggerDataForGirls } = useFetchBloggerListByAudienceQuery('girls');
  const { data: testsListDataForMen } = useFetchTestsCardByAudienceQuery('men');
  const { data: testsListDataForGirls } = useFetchTestsCardByAudienceQuery('girls');

  const userState = useAppSelector((state: RootState) => state.user);
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
  const [followingState, setFollowingState] = useState<boolean>(false);

  const [categoryList, setCategoryList] = useState<string>('tests'); //'tests' | 'bloggers'

  const toggleListHandler = (category: 'tests' | 'bloggers') => {
    setCategoryList(category);
    navigate(`${toggleMenGirls}/${category}`);
  };

  // Follow
  // const [ follow ]  = useFollowMutation();
  // const [ unfollow ] = useUnfollowMutation();
  // const [ following ] = useFollowingMutation();


  // useEffect(() => {
  //   if(followingList && bloggerForMen && followingList.includes(blogger.id)) {
  //     setFollowingState(true);
  //   }
  // },[followingList, blogger]);

  useEffect(() => {
    setCategoryList(location.pathname.split('/')[3]);
  },[]);

  useEffect(() => {
    const languageSet = localStorage.getItem('i18nextLng');
    if(userState.language) {
      setLanguage(userState.language);
    } else if(languageSet) {
      setLanguage(languageSet);
    }
  },[userState.language]);

  // BLOGGERS LISTS
  useEffect(() => {
    if(bloggerDataForMen) {
      setBloggerForMen(bloggerDataForMen);
    }
  },[bloggerDataForMen]);
  useEffect(() => {
    if(bloggerDataForGirls) {
      setBloggerForGirls(bloggerDataForGirls);
    }
  },[bloggerDataForGirls]);

  // TESTS LISTS
  useEffect(() => {
    if(testsListDataForMen) {
      setTestsListForMen(testsListDataForMen);
    }
  },[testsListDataForMen]);
  useEffect(() => {
    if(testsListDataForGirls) {
      setTestsListForGirls(testsListDataForGirls);
    }
  },[testsListDataForGirls]);

  // const followHandler = (action: 'follow' | 'unfollow') => {
  //   if((action === 'follow') && (userState.id) && (blogger)) {
  //     follow({id: userState.id, bloggerId: blogger.id});
  //     following({ id: blogger.id, value: 1 });
  //   }
  
  //   if((action === 'unfollow') && (userState.id) && (blogger)) {
  //     unfollow({id: userState.id, bloggerId: blogger.id});
  //     following({ id: blogger.id, value: -1 });
  //   } 
  // };

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
        });
      }
      navigate(location.pathname);
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
      <ExploreNavbar
        categoryList={categoryList}
        toggleListHandler={toggleListHandler}
        setToggleMenGirls={setToggleMenGirls}
        toggleMenGirls={toggleMenGirls}
      />
      <Routes>
        <Route path='/men/bloggers' element={
          <>
            {(bloggerForMen) ? bloggerForMen.map((blogger) => (
              <BloggerCard
                key={blogger.id}
                id={blogger.id}
                avatar={blogger.avatar}
                name={(language === 'or') ? blogger.name.or  : blogger.name.ua}
                
                mainBlogFollowers={blogger.mainBlog.followers}
                mainBlogSoc={blogger.mainBlog.soc}

                followers={blogger.followers}
                passedTests={blogger.passedTests}
                topics={(language === 'or') ? blogger.topics.or  : blogger.topics.ua}
                language={language}

                // followHandler={followHandler}
                followHandler={()=>{}}
                followingState={followingState}
              /> 
            )) : Array.apply(null, Array(2)).map((item, index) => (
              <Skeleton 
                key={index}
                sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
                variant="rounded"  
                animation="wave"  
                width={'100%'} 
                height={'9rem'} 
              />
            ))}
          </>
        }/>
        <Route path='/men/tests' element={
          <>
            { (testsListForMen) ? testsListForMen.map((test) => (
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
            )) : Array.apply(null, Array(4)).map((item, index) => (
              <Skeleton 
                key={index}
                sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
                variant="rounded"  
                animation="wave"  
                width={'100%'} 
                height={'15rem'} 
              />
            ))}
          </>
        }/>
        <Route path='/girls/bloggers' element={
          <>
            {(bloggerForGirls) ? bloggerForGirls.map((blogger) => (
              <BloggerCard
                key={blogger.id}
                id={blogger.id}
                avatar={blogger.avatar}
                name={(language === 'or') ? blogger.name.or  : blogger.name.ua}
                
                mainBlogFollowers={blogger.mainBlog.followers}
                mainBlogSoc={blogger.mainBlog.soc}

                followers={blogger.followers}
                passedTests={blogger.passedTests}
                topics={(language === 'or') ? blogger.topics.or  : blogger.topics.ua}
                language={language}

                // followHandler={followHandler}
                followHandler={() => {}}
                followingState={followingState}
              /> 
            )) : Array.apply(null, Array(2)).map((item, index) => (
              <Skeleton 
                key={index}
                sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
                variant="rounded"  
                animation="wave"  
                width={'100%'} 
                height={'9rem'} 
              />
            ))}
          </>
        }/>
        {/* <Route path='/girls/tests' element={
          <>
            { (testsListForGirls) ? testsListForGirls.map((test) => (
              <TestCardOpen
                key={test.id}
                testName={(language === 'or') ? test.testName.or : test.testName.ua}
                cover={test.cover}
                bloggerId={test.blogger.id}
                bloggerName={(language === 'or') ? test.blogger.name.or : test.blogger.name.ua}
                bloggerAvatar={test.blogger.avatar}
                footerText={(userState.id) ? `${(language === 'or') ? 'Вопросов: ' : 'Питань: '} ${test.qLength}` :
                  `${(language === 'or') ? 'Вход через email' : 'Вхід через email'}`
                }
                onClick={(userState.id) ? () => navigate(`/test/${test.id}`) : onGoogleClick }
                button={(userState.id) ? <ButtonPlay width={'22%'}/> : <BtnEmail />} 
              />
            )) : Array.apply(null, Array(4)).map((item, index) => (
              <Skeleton 
                key={index}
                sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
                variant="rounded"  
                animation="wave"  
                width={'100%'} 
                height={'15rem'} 
              />
            ))}
          </>
        }/> */}
      </Routes>
      <FooterPolicy language={language} />
    </Container>
  );
};

export default ExplorePage;