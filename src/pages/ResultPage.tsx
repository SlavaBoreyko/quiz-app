import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Containers/Container/Container';
import CircleBar from '../components/Result/CircleBar/CircleBar';
import PreviewCard from '../components/Result/PreviewCard/PreviewCard';
import ResultCard from '../components/Result/ResultCard/ResultCard';
import s from '../components/Profile/TestCard/TestCardPass/TestCardPass.module.scss';
import testImage from '../assets/test-images/hand-or-not.jpg';
import IconReset from '../assets/svg/reset-svgrepo-com.svg';

// redux-toolkit
import { useFetchAnswersQuery, useFetchVerdictQuery } from '../features/user/userApi';

// actions
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import ButtonTextIcon from '../components/Buttons/ButtonTextIcon/ButtonTextIcon';
import openInNewTab from '../utils/openInNewTab';
import PicsGallery from '../components/XT/PicsGallery/PicsGallery';
import { useFetchTestQuery } from '../features/test/testApi';

// lodash for objects
const _ = require('lodash');

const ResultPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [gameMode, setGameMode] = useState<boolean>(pathname.split('/')[1] === 'game');
  const userState = useAppSelector((state: RootState) => state.user);
  const { data: answersData } = useFetchAnswersQuery(userState.id!);

  // FOR XT 
  const { data: test }  = useFetchTestQuery(params.id!);
  const [ picsList, setPicsList ] = useState<string[]>([]);
  const [answersArray, setAnswersArray] = useState<number[]>([]);
  // const [dataVerdict, setDataVerdict] = useState<any | undefined>(undefined);

  useEffect(() => {
    if(gameMode) {
      let picsArray: string[] = [];
      test && test.questions.forEach((item: any) => {
        picsArray.push(item.img);
      });
      setPicsList(picsArray);
    }
  }, [test, gameMode]);

  const [resultPoints, setResultPoints] = useState<number | undefined>(undefined);
  const [showResult, setShowResult] = useState(false);

  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
  useEffect(() => {
    const languageSet = localStorage.getItem('i18nextLng');
    if(userState.language) {
      setLanguage(userState.language);
    } else if(languageSet) {
      setLanguage(languageSet);
    }
  },[userState.language]);

  // Result for an Unregistered User
  useEffect(() => {
    if(!userState.id) {
      const demoTest = localStorage.getItem('demoTest');
      if(demoTest) {
        const demoTestParsed = JSON.parse(demoTest);
        const points = _.get(demoTestParsed, `${params.id}.points`);
        setAnswersArray(_.get(demoTestParsed, `${params.id}.answersArray`));
        setResultPoints(points);
      }
    } 
  }, []);
    
  useEffect(() => {
    if(answersData) {
      const points = _.get(answersData, `${params.id}.points`);
      setAnswersArray(_.get(answersData, `${params.id}.answersArray`));
      setResultPoints(points);
    }
  }, [answersData]);

  const { data: dataVerdict } = useFetchVerdictQuery({ testId: params.id, points: resultPoints});


  // useEffect(() => {
  //   if(params.id && resultPoints && !gameMode) {
  //     const { data: dataVerdict } = useFetchVerdictQuery({ testId: params.id, points: resultPoints});
  //     setDataVerdict(dataVerdict);
  //   }
  // }, []);


  // useEffect(() => {
  //   if(answersArray && gameMode) {
  //     const removeMinusArray = answersArray.map((num) => {
  //       if (num === -1) {
  //         return num = 0;
  //       } else {
  //         return num;
  //       }
  //     });
  //     const sum = removeMinusArray.reduce((partialSum, a) => partialSum + a, 0);
  //     setOpenAndLock(sum);
  //   }
  // }, [answersArray]);

  return (
    <Container 
      img={gameMode ? '' : testImage} 
      backgroundColor={gameMode ? '#212529' : '#000000da'}
      justifyContent='flex-start'
      locked={false}
    >
      {(dataVerdict) && (resultPoints) && (!gameMode) &&
            <img className={s.IconBigBackgroung} src={dataVerdict.icon} alt='Status icon'/>
      }
      {(answersArray && resultPoints) ?
        <CircleBar 
          resultPoints={gameMode ? undefined : resultPoints}
          openAndLock={gameMode ? `${resultPoints}/${answersArray.length}` : undefined}
          setShowResult={setShowResult}
          width={gameMode ? 40 : 50}
        /> : <></>
      }
      { (gameMode) && (
        <div style={{ marginTop: '4rem'}}>
          <PicsGallery 
            pics={picsList}
            answers={answersArray ? answersArray : undefined}
          />
        </div>
      )}
      {(dataVerdict) && (
        <>
          <ResultCard 
            showText={showResult}
            status={(language === 'or') ? dataVerdict.status.or : dataVerdict.status.ua}
            description={(language === 'or') ? dataVerdict.description.or : dataVerdict.description.ua}
          />
          {/* BUTTONS */}
          {(dataVerdict.blogLink) && (
            <ButtonTextIcon 
              caption={(language === 'or') ?  'Открыть видео Макса' : 'Відкрити відео Макса'} 
              // icon={IconReset} 
              onClick={() => openInNewTab(dataVerdict.blogLink) }
            />
          )}
          {(!gameMode) && (
            <ButtonTextIcon 
              caption={(language === 'or') ? 'Пройти тест еще раз' : 'Пройти тест ще раз'} 
              icon={IconReset} 
              onClick={() => navigate(`/test/${params.id}/1`) }
            />
          )}
          {(!userState.email) && (!gameMode) && (
            <ButtonTextIcon 
              caption={(language === 'or') ? 'Просмотреть свои ошибки' : 'Переглянути свої помилки'} 
              // icon={} 
              onClick={() => navigate(`/test/${params.id}/answers`) }
            />
          )}
        </>
      )}
      {/* <div style={{marginTop: '2rem'}}></div>
      {   (!userState.id) && 
            (<PreviewCard showText={true}/> )
      }  */}
    </Container>
  );
};

export default ResultPage;