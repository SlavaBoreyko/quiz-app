/* eslint-disable no-irregular-whitespace */
import { Skeleton } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import Container from '../components/Containers/Container/Container';
import ButtonPlay from '../components/Buttons/ButtonPlay/ButtonPlay';
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

import { bloggerDataType, bloggerInitialState } from './BloggerCreatePage';
import EditHeader from '../components/BloggerCabinet/EditHeader/EditHeader';
import HeaderCreateBtn from '../components/BloggerCabinet/HeaderCreateBtn/HeaderCreateBtn';
import EditCard from '../components/BloggerCabinet/EditCard/EditCard';
import ContainerHint from '../components/BloggerCabinet/ContainerHint/ContainerHint';
import imgHint2 from '../assets/mockups/hint-screen-2-2.png';
import ContainerList from '../components/Containers/ContainerList/ContainerList';
import { BloggersHeader } from '../components/Bloggers/BloggersHeader/BloggersHeader';
import { SocialType } from '../components/Bloggers/types/blogger.types';
import { BloggerNumbers } from '../components/Bloggers/BloggerNumbers/BloggerNumbers';
import { SkeletonBloggerHeader } from '../components/shared/SkeletonLayouts/SkeletonBloggerHeader/SkeletonBloggerHeader';
import { SkeletonTestCards } from '../components/shared/SkeletonLayouts';
import TestCard from '../components/Profile/TestCard/TestCard';
import { TestCardBody } from '../components/Profile/TestCard/TestCardBody/TestCardBody';
import { TestCardList } from '../components/Profile/TestCard/TestCardList/TestCardList';

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
        <BloggersHeader
          id={blogger.id}
          key={blogger.id}
          avatar={blogger.avatar}
          name={blogger.name.ua}
          description={blogger.description.ua}
        >
          <BloggerNumbers
            mainBlog={mainBlog}
            followers={blogger.followers}
            passedTests={blogger.passedTests}
          />
        </BloggersHeader>
      ) : (
        <SkeletonBloggerHeader />
      )}
      <TestCardList list={testList} footerEl={<ButtonPlay width={'22%'} />} />
      <FooterPolicy language={language} />
    </Container>
  );
};

export default BloggerPage;
