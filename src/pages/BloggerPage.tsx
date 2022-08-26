import { Skeleton } from '@mui/material';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
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
import { useFetchFollowingListQuery, useFollowMutation, useUnfollowMutation } from '../features/user/userApi';
import { db } from '../firebase.config';
import { BloggerBigType, TestCardType } from '../types/test.types';

const BloggerPage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [blogger, setBlogger] = useState<BloggerBigType | undefined>(undefined)
    const { data: bloggerData, isLoading, isError, error } = useFetchBloggerQuery(params.id!);

    const userState = useAppSelector((state: RootState) => state.user);
    const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
    const { data: followingList } = useFetchFollowingListQuery(userState.id!);
    const [followingState, setFollowingState] = useState<boolean>(false);
    // console.log('followingList', followingList)
    const { data: allTestsByBlogger }  = useFetchTestsByBloggerQuery('Фан-клуб Дівертіто');
    const [testList, setTestList] = useState<TestCardType[] | undefined>(undefined);

    // Follow
    const [ follow ]  = useFollowMutation();
    const [ unfollow ] = useUnfollowMutation();

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
    // (userState) && 
    // console.log('userState.following', userState);

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
          navigate('/divertito');
      } catch (error) {
          console.error('Could not authorize with Google')
      }
    }

    // ANALYTICS 
  //   useEffect(() => {
  //     const fetchUsersActivities = async() => {
  //         // const testName = 'first-date';

  //         const q = query(collection(db, "users"), where(`answers`, "!=", null));
          
  //         const querySnapshot = await getDocs(q);

  //         ['first-date', 'at-home', 'relationship-level'].forEach((testName) => {
  //             let counter = 0;
  //             querySnapshot.forEach((doc) => {
  //                 const data = doc.data()
  //                 // if (data.answers[testName] && data.answers[testName]['points'] >= 51) {
                  
  //                 if (data.answers[testName] && data.answers[testName]['points'] >= 0) {
  //                 // if (Object.keys(data.answers).length === 3) {
  //                     counter++
  //                 }
  //             });
  //             console.log(testName, ' ', counter);
  //         })
          
  //     }
  //     fetchUsersActivities();
  // }, [])

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
          mainBlog={(language === 'or') ? blogger.mainBlog.or : blogger.mainBlog.ua}
          mainBlogFollowers={blogger.mainBlog.followers}
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
      <div 
          style={{
              color: '#adb5bdaa',
              fontSize: '1.2rem',
              marginTop: '1rem',
          }}
      >
      {(language === 'or') ? 
      <> 
          *Пользуясь сайтом, вы принимаете правила
          <a  href={require('../assets/pdf/privacy-policy.pdf')} target='blank'
              style={{
                  color: '#adb5bdd2',
              }}
          > Политики конфиденциальности.</a>
      </> :
      <>
          *Користуючись сайтом, ви приймаєте правила
          <a href={require('../assets/pdf/privacy-policy.pdf')} target='blank'
              style={{
                  color: '#adb5bdd2',
              }}
          > Політики конфіденційності.</a>
      </>
      }
      </div>
    </Container>
  )
}

export default BloggerPage