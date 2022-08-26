import { Skeleton } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import BloggerCard from '../components/Bloggers/BloggerCard/BloggerCard';
import BloggersHeader from '../components/Bloggers/BloggersHeader/BloggersHeader';
import ButtonLabel from '../components/Buttons/ButtonLabel/ButtonLabel';
import Container from '../components/Containers/Container/Container';
import BtnGoogleOAuth from '../components/Profile/BtnGoogleOAuth/BtnGoogleOAuth';
import ButtonPlay from '../components/Profile/ButtonPlay/ButtonPlay';
import TestCardOpen from '../components/Profile/TestCard/TestCardOpen/TestCardOpen';
import { useFetchBloggerQuery } from '../features/blogger/bloggerApi';
import { useFetchTestsByBloggerQuery } from '../features/test/testApi';
import { useFetchFollowingListQuery, useFollowMutation, useUnfollowMutation } from '../features/user/userApi';
import { db } from '../firebase.config';
import { BloggerBigType, TestCardType } from '../types/test.types';

const ExplorePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [toggleBtn, setToggleBtn] = useState<boolean>(true);
    const [blogger, setBlogger] = useState<BloggerBigType | undefined>(undefined)
    const { data: bloggerData, isLoading, isError, error } = useFetchBloggerQuery('divertito');

    const userState = useAppSelector((state: RootState) => state.user);
    const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
    const { data: followingList } = useFetchFollowingListQuery(userState.id!);
    const [followingState, setFollowingState] = useState<boolean>(false);

    // Follow
    const [ follow ]  = useFollowMutation();
    const [ unfollow ] = useUnfollowMutation();

    useEffect(() => {
        if(followingList && blogger && followingList.includes(blogger.id)) {
          setFollowingState(true);
        }
      },[followingList, blogger]);

    useEffect(() => {
        if(location.pathname.split('/')[2] === 'men') {
            setToggleBtn(true);
        } else if (location.pathname.split('/')[2] === 'girls') {
            setToggleBtn(false);
        }
    },[])

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

    const followHandler = (action: 'follow' | 'unfollow') => {
        if((action === 'follow') && (userState.id) && (blogger)) {
          follow({id: userState.id, bloggerId: blogger.id});
          console.log('followHandler: follow');
        }
  
        if((action === 'unfollow') && (userState.id) && (blogger)) {
          unfollow({id: userState.id, bloggerId: blogger.id});
          console.log('followHandler: UNFOLLOW');
        } 
      }

  return (
    <Container
      justifyContent='flex-start'
      backgroundColor='#212529'
      locked={false}
    > 
        <div style={{
            display: 'flex',
            marginTop: '2rem',
            marginBottom: '1rem',
        }}>
            <ButtonLabel
                label=' For Men '
                // onClick={() => setToggleBtn((prev) => !prev)}
                onClick={() => {
                    setToggleBtn((prev) => !prev);
                    navigate('men');
                }}
                active={toggleBtn}
            />
            <span 
                style={{
                    color: '#F59F00',
                    fontSize: '1.6rem',
                }}
            >{'  |  '}</span>
            <ButtonLabel
                label=' For Girls '
                // onClick={() => setToggleBtn((prev) => !prev)}
                onClick={() => {
                    setToggleBtn((prev) => !prev);
                    navigate('girls');
                }}
                active={!toggleBtn}
            />
        </div>
        <Routes>
        <Route path="/men" element={
            <>
                {(blogger) ? (
                    <BloggerCard
                        key={blogger.id}
                        id={blogger.id}
                        avatar={blogger.avatar}
                        name={(language === 'or') ? blogger.name.or  : blogger.name.ua}
                        mainBlog={(language === 'or') ? blogger.mainBlog.or : blogger.mainBlog.ua}
                        mainBlogFollowers={blogger.mainBlog.followers}
                        followers={blogger.followers}
                        passedTests={blogger.passedTests}
                        topics={(language === 'or') ? blogger.topics.or  : blogger.topics.ua}
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
                        height={'12rem'} 
                    />
                )}
            </>
        }/>
        <Route path="/girls" element={
            <>
                {(blogger) ? (
                    <BloggerCard
                        key={blogger.id}
                        id={blogger.id}
                        avatar={blogger.avatar}
                        name={(language === 'or') ? blogger.name.or  : "Новий блогер"}
                        mainBlog={(language === 'or') ? blogger.mainBlog.or : blogger.mainBlog.ua}
                        mainBlogFollowers={945000}
                        followers={1254}
                        passedTests={3433}
                        topics={(language === 'or') ? blogger.topics.or  : blogger.topics.ua}
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
                        height={'12rem'} 
                    />
                )}
            </>
        }/>
        </Routes>
    </Container>
  )
}

export default ExplorePage