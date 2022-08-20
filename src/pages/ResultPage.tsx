import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Containers/Container/Container'
import CircleBar from '../components/Result/CircleBar/CircleBar'
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

// lodash for objects
const _ = require('lodash');


const ResultPage = () => {

    const params = useParams();
    const navigate = useNavigate();
    // redux-toolkit
    const userState = useAppSelector((state: RootState) => state.user);
    const { data: answersData, isLoading, isError, error } = useFetchAnswersQuery(userState.id!);

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
    },[userState.language])

    // Result for an Unregistered User
    useEffect(() => {
        if(!userState.id) {
            const demoTest = localStorage.getItem('demoTest');
            if(demoTest) {
                const demoTestParsed = JSON.parse(demoTest);
                const points = _.get(demoTestParsed, `${params.id}.points`);
                setResultPoints(points);
            }
        } 
    }, []);
    
    useEffect(() => {
        if(answersData) {
            const points = _.get(answersData, `${params.id}.points`);
            setResultPoints(points);
        }
    }, [answersData]);

    // PROPER OR NOT? 
    const testId = params.id!;
    const { data: dataVerdict } = useFetchVerdictQuery({ testId, points: resultPoints!});
    const openInNewTab = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
  return (
    <Container 
        img={testImage} 
        backgroundColor='#000000da'
        justifyContent='flex-start'
        locked={false}
    >
        {(dataVerdict) && (resultPoints) && 
            <img className={s.IconBigBackgroung} src={dataVerdict.icon} alt='Status icon'/>
        }
        {   (localStorage.getItem('demoTest') && resultPoints) || (answersData && resultPoints) ?
            // Doesn't rerender % - return to (resultPoints) &&
            <CircleBar 
                resultPoints={resultPoints}
                setShowResult={setShowResult}
                width={50}
            /> : <></>
        }
        {
            (dataVerdict) &&
            <>
            <ResultCard 
                showText={showResult}
                // status={dataVerdict.status} 
                // description={dataVerdict.description}
                status={(language === 'or') ? dataVerdict.status.or : dataVerdict.status.ua}
                description={(language === 'or') ? dataVerdict.description.or : dataVerdict.description.ua}
            />
            {/* BUTTONS */}
            {(dataVerdict.status.ua !== 'Грозний Їбака') && (dataVerdict.blogLink) && (
                <ButtonTextIcon 
                    caption={(language === 'or') ?  'Открыть видео Макса' : 'Відкрити відео Макса'} 
                    // icon={IconReset} 
                    onClick={() => openInNewTab(dataVerdict.blogLink) }
                />
            )}

            <ButtonTextIcon 
                caption={(language === 'or') ? 'Пройти тест еще раз' : 'Пройти тест ще раз'} 
                icon={IconReset} 
                onClick={() => navigate(`/test/${params.id}`) }
            />
            <ButtonTextIcon 
                caption={(language === 'or') ? 'Просмотреть свои ошибки' : 'Переглянути свої помилки'} 
                // icon={} 
                onClick={() => navigate(`/test/${params.id}/answers`) }
            />
            </>
        }
        <div style={{marginTop: '2rem'}}></div>
        {   (!userState.id) && 
            (<PreviewCard showText={true}/> )
        } 
    </Container>
  )
}

export default ResultPage