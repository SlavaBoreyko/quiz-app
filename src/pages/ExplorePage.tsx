import { Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import BloggerCard from '../components/Bloggers/BloggerCard/BloggerCard';
import ButtonLabel from '../components/Buttons/ButtonLabel/ButtonLabel';
import Container from '../components/Containers/Container/Container';
import { useFetchBloggerListByAudienceQuery, useFetchBloggerQuery } from '../features/blogger/bloggerApi';
import { useFetchFollowingListQuery, useFollowMutation, useUnfollowMutation } from '../features/user/userApi';
import { BloggerBigType } from '../types/test.types';

const ExplorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [toggleBtn, setToggleBtn] = useState<boolean>(true);
  const [bloggerForMen, setBloggerForMen] = useState<BloggerBigType[] | undefined>(undefined);
  const [bloggerForGirls, setBloggerForGirls] = useState<BloggerBigType[] | undefined>(undefined);
  const { data: bloggerDataForMen } = useFetchBloggerListByAudienceQuery('men');
  const { data: bloggerDataForGirls } = useFetchBloggerListByAudienceQuery('girls');

  const userState = useAppSelector((state: RootState) => state.user);
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
  const { data: followingList } = useFetchFollowingListQuery(userState.id!);
  const [followingState, setFollowingState] = useState<boolean>(false);

  // Follow
  const [ follow ]  = useFollowMutation();
  const [ unfollow ] = useUnfollowMutation();

  // useEffect(() => {
  //   if(followingList && bloggerForMen && followingList.includes(blogger.id)) {
  //     setFollowingState(true);
  //   }
  // },[followingList, blogger]);

  useEffect(() => {
    if(location.pathname.split('/')[2] === 'men') {
      setToggleBtn(true);
    } else if (location.pathname.split('/')[2] === 'girls') {
      setToggleBtn(false);
    }
  },[]);

  useEffect(() => {
    const languageSet = localStorage.getItem('i18nextLng');
    if(userState.language) {
      setLanguage(userState.language);
    } else if(languageSet) {
      setLanguage(languageSet);
    }
  },[userState.language]);

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

  // const followHandler = (action: 'follow' | 'unfollow') => {
  //   if((action === 'follow') && (userState.id) && (blogger)) {
  //     follow({id: userState.id, bloggerId: blogger.id});
  //   }
  
  //   if((action === 'unfollow') && (userState.id) && (blogger)) {
  //     unfollow({id: userState.id, bloggerId: blogger.id});
  //   } 
  // };

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
            )) : (
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
            )) : (
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
  );
};

export default ExplorePage;