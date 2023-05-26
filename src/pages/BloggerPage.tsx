/* eslint-disable no-irregular-whitespace */
import { Skeleton } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import BloggersHeader from '../components/Bloggers/BloggersHeader/BloggersHeader';
import Container from '../components/Containers/Container/Container';
import ButtonPlay from '../components/Buttons/ButtonPlay/ButtonPlay';
import TestCardOpen from '../components/Profile/TestCard/TestCardOpen/TestCardOpen';
import {
  useFetchBloggerQuery,
  useFollowingMutation,
} from '../features/blogger/bloggerApi';
import { useFetchTestsByBloggerIdQuery } from '../features/test/testApi';
import {
  useFetchBloggerInUserQuery,
  useFetchFollowingListQuery,
  useFollowMutation,
  useUnfollowMutation,
} from '../features/user/userApi';
import { db } from '../firebase.config';
import { BloggerBigType, TestCardType } from '../types/test.types';
import ButtonPrice from '../components/Buttons/ButtonPrice/ButtonPrice';
import openInNewTab from '../utils/openInNewTab';
import BtnEmail from '../components/Buttons/BtnEmail/BtnEmail';
import FooterPolicy from '../components/Footers/FooterPolicy';
import SubcriptionCard from '../components/Profile/TestCard/SubcriptionCard/SubcriptionCard';
import TestCardLock from '../components/Profile/TestCard/TestCardLock/TestCardLock';
import { bloggerDataType, bloggerInitialState } from './BloggerCreatePage';
import EditHeader from '../components/BloggerCabinet/EditHeader/EditHeader';
import HeaderCreateBtn from '../components/BloggerCabinet/HeaderCreateBtn/HeaderCreateBtn';
import EditCard from '../components/BloggerCabinet/EditCard/EditCard';
import ContainerHint from '../components/BloggerCabinet/ContainerHint/ContainerHint';
import imgHint2 from '../assets/mockups/hint-screen-2-2.png';
import ContainerList from '../components/Containers/ContainerList/ContainerList';
import { BloggersHeader2 } from '../components/Bloggers/BloggersHeader2/BloggersHeader2';
import { SocialType } from '../components/Bloggers/types/blogger.types';

const BloggerPage = () => {
  const myRefCardHint = useRef<HTMLDivElement>(null);
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [editPathname, setEditPathname] = useState<boolean>(false);

  const [isBloggerProfile, setIsBloggerProfile] = useState<boolean>(false);
  const [blogger, setBlogger] = useState<BloggerBigType | undefined>(undefined);
  const {
    data: bloggerData,
    isFetching,
    isLoading,
  } = useFetchBloggerQuery(params.id!);

  const userState = useAppSelector((state: RootState) => state.user);
  const { data: bloggerDataInUser } = useFetchBloggerInUserQuery(userState.id);
  // EDIT MODE
  const [editMode, setEditMode] = useState<boolean>(false);
  const [formData, setFormData] = useState<BloggerBigType>(bloggerInitialState);
  const [createTest, setCreateTest] = useState<boolean>(false);
  const [createGame, setCreateGame] = useState<boolean>(false);

  const executeScroll = () => {
    myRefCardHint.current &&
      myRefCardHint.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
  };

  useEffect(() => {
    if (pathname && bloggerDataInUser) {
      pathname.split('/')[1] === bloggerDataInUser.blogger.nickname &&
        setIsBloggerProfile(true);
    } else {
      setIsBloggerProfile(false);
    }
    if (pathname.split('/')[2] === 'edit') setEditPathname(true);

    if (createGame) {
      executeScroll();
    }
  }, [pathname, bloggerDataInUser, createGame]);

  const [language, setLanguage] = useState<string | null>(
    localStorage.getItem('i18nextLng'),
  );
  const { data: followingList } = useFetchFollowingListQuery(userState.id!);
  const [followingState, setFollowingState] = useState<boolean>(false);
  // console.log('followingList', followingList)
  const { data: allTestsByBlogger } = useFetchTestsByBloggerIdQuery(params.id!);
  const [testList, setTestList] = useState<TestCardType[] | undefined>(
    undefined,
  );

  // Follow
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const [following] = useFollowingMutation();

  useEffect(() => {
    if (followingList && blogger && followingList.includes(blogger.id)) {
      setFollowingState(true);
    }
  }, [followingList, blogger]);

  useEffect(() => {
    const languageSet = localStorage.getItem('i18nextLng');
    if (userState.language) {
      setLanguage(userState.language);
    } else if (languageSet) {
      setLanguage(languageSet);
    }
  }, [userState.language]);

  useEffect(() => {
    if (bloggerData) {
      setBlogger(bloggerData);
      // fullfill EditCard
      setFormData(bloggerData);
    }
  }, [bloggerData]);

  // idea 2 is working
  // useEffect(() => {
  //   setBlogger(formData);
  // }, [editMode]);

  // FOR NEXT SORT
  useEffect(() => {
    if (allTestsByBlogger) {
      setTestList(allTestsByBlogger);
    }
  }, [allTestsByBlogger]);

  const followHandler = (action: 'follow' | 'unfollow') => {
    if (action === 'follow' && userState.id && blogger) {
      // follow({id: userState.id, bloggerId: blogger.id});
      following({ id: blogger.id, value: 1 });
      // console.log('followHandler: follow');
    }

    if (action === 'unfollow' && userState.id && blogger) {
      following({ id: blogger.id, value: -1 });
      // console.log('followHandler: UNFOLLOW');
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
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          // timestamp: serverTimestamp()
        });
      }
      navigate(location.pathname);
    } catch (error) {
      console.error('Could not authorize with Google');
    }
  };

  const mainBlog = blogger
    ? {
        socialType: blogger.mainBlog.soc as unknown as SocialType,
        name: blogger.mainBlog.ua,
        followers: blogger.mainBlog.followers,
        link: blogger.mainBlog.link,
      }
    : null;

  return (
    <Container
      justifyContent="flex-start"
      backgroundColor="#212529"
      locked={false}
    >
      {blogger ? (
        <BloggersHeader2
          id={blogger.id}
          key={blogger.id}
          avatar={blogger.avatar}
          name={blogger.name.ua}
          mainBlog={mainBlog}
          // mainBlogSoc={blogger.mainBlog.soc}
          // mainBlogName={blogger.mainBlog.ua}
          // mainBlogFollowers={blogger.mainBlog.followers}
          // mainBlogLink={blogger.mainBlog.link}
          followers={blogger.followers}
          passedTests={blogger.passedTests}
          // description={
          //   language === 'ua'
          //     ? blogger.description.ua
          //     : blogger.description.pl
          // }
          description={blogger.description.ua}
          language={language}
          followHandler={followHandler}
          followingState={followingState}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <div style={{ width: '100%' }}>
            <Skeleton
              sx={{
                bgcolor: '#2f363c',
                margin: '-1rem 2rem 0rem 0',
                justifyContent: 'flex-start',
              }}
              variant="rounded"
              animation="wave"
              width="48%"
              height="17rem"
            />
            <Skeleton
              sx={{
                bgcolor: '#2f363c',
                margin: '1rem 2rem 2rem 0',
                justifyContent: 'flex-start',
              }}
              variant="rounded"
              animation="wave"
              width="48%"
              height="7rem"
            />
          </div>
        </div>
      )}
      {isBloggerProfile && !editMode ? (
        <HeaderCreateBtn
          createGame={createGame}
          setCreateGame={setCreateGame}
          createTest={createTest}
          setCreateTest={setCreateTest}
        />
      ) : (
        <></>
      )}
      <div
        ref={myRefCardHint}
        onClick={() => setCreateGame(true)}
        style={{
          width: '100%',
          cursor: 'pointer',
        }}
      >
        {editPathname && (
          <ContainerHint
            img={imgHint2}
            textHint={'Create Game Card with cover and title 🥰'}
          />
        )}
      </div>
      {!editMode && createGame && formData && (
        <EditCard
          blogger={{
            id: formData.id,
            avatar: formData.avatar,
            name: {
              en: formData.name.en,
              pl: formData.name.pl,
              ua: formData.name.pl,
              or: formData.name.pl,
            },
          }}
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
      <ContainerList>
        {testList ? (
          testList.map((test, index) =>
            test.type && test.type === 'game' ? (
              <TestCardLock
                editMode={isBloggerProfile}
                docId={test.docId}
                key={test.id}
                // testName={
                //   language === 'ua' ? test.testName.ua : test.testName.pl
                // }
                testName={test.testName.ua}
                cover={test.cover}
                bloggerId={test.blogger.id}
                // bloggerName={
                //   language === 'ua'
                //     ? test.blogger.name.ua
                //     : test.blogger.name.pl
                // }
                bloggerName={test.blogger.name.ua}
                bloggerAvatar={test.blogger.avatar}
                // picsMini={(userState.id) ? test.picsMini : undefined}
                picsMini={test.picsMini}
                footerText={
                  // (test.payment === 'free' && userState.id) ?
                  test.payment === 'free'
                    ? `${language === 'ua' ? 'Фото: ' : 'Zdjęcia: '} ${
                        test.qLength
                      }`
                    : test.payment !== 'free' && userState.id
                    ? `${language === 'ua' ? '' : ''}`
                    : `${
                        language === 'ua' ? 'Вход через email' : 'Zaloguj się'
                      }`
                }
                onClick={
                  // (test.payment === 'free' && userState.id) ? () => navigate(`/game/${test.id}/1`) :
                  test.payment === 'free'
                    ? () => navigate(`/game/${test.id}/1`)
                    : test.payment !== 'free' && userState.id
                    ? () => openInNewTab(test.payment)
                    : onGoogleClick
                }
                price={test.price ? test.price : undefined}
                button={
                  // (test.payment === 'free' && userState.id) ?
                  test.payment === 'free' ? (
                    <ButtonPlay width={'22%'} />
                  ) : test.payment !== 'free' && userState.id ? (
                    <ButtonPrice
                      currency={test.currency}
                      onClick={(e: any) => {
                        e.stopPropagation();
                        openInNewTab(test.payment);
                      }}
                    />
                  ) : (
                    <BtnEmail />
                  )
                }
              />
            ) : (
              <TestCardOpen
                key={test.id}
                testName={test.testName.ua}
                cover={test.cover}
                bloggerId={test.blogger.id}
                bloggerName={test.blogger.name.ua}
                bloggerAvatar={test.blogger.avatar}
                footerText={
                  // (test.payment === 'free' && userState.id) ?
                  test.payment === 'free'
                    ? `${'Питань:  '} ${test.qLength}`
                    : test.payment !== 'free'
                    ? `${'Платный тест '}`
                    : `${'Вход через email'}`
                }
                onClick={
                  test.payment === 'free'
                    ? () => navigate(`/test/${test.id}/1`)
                    : test.payment !== 'free' && userState.id
                    ? () => openInNewTab(test.payment)
                    : onGoogleClick
                }
                button={
                  test.payment === 'free' ? (
                    <ButtonPlay width={'22%'} />
                  ) : test.payment !== 'free' && userState.id ? (
                    <ButtonPrice
                      currency={test.currency}
                      onClick={(e: any) => {
                        e.stopPropagation();
                        openInNewTab(test.payment);
                      }}
                    />
                  ) : (
                    <BtnEmail />
                  )
                }
              />
            ),
          )
        ) : (
          <>
            <Skeleton
              sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
              variant="rounded"
              animation="wave"
              width={'100%'}
              height={'15rem'}
            />
            <Skeleton
              sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
              variant="rounded"
              animation="wave"
              width={'100%'}
              height={'15rem'}
            />
            <Skeleton
              sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
              variant="rounded"
              animation="wave"
              width={'100%'}
              height={'15rem'}
            />
            <Skeleton
              sx={{ bgcolor: '#2f363c', marginTop: '1rem' }}
              variant="rounded"
              animation="wave"
              width={'100%'}
              height={'15rem'}
            />
          </>
        )}
      </ContainerList>
      <FooterPolicy language={language} />
    </Container>
  );
};

export default BloggerPage;
