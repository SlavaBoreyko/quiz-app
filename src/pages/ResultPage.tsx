import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Containers/Container/Container'
import CircleBar from '../components/Result/CircleBar/CircleBar'
import PreviewCard from '../components/Result/PreviewCard/PreviewCard';
import ResultCard from '../components/Result/ResultCard/ResultCard';
import s from '../components/Profile/PassedTestCard/PassedTestCard.module.scss';
import testImage from '../assets/test-images/test-stock01.png';
import IconReset from '../assets/svg/reset-svgrepo-com.svg';


// redux-toolkit
import { useFetchAnswersQuery, useFetchVerdictQuery } from '../features/user/userApi';

// actions
import { getVerdict } from '../actions';
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

    // console.log(' >>>> dataVerdict.description', dataVerdict.description)
  return (
    <Container 
        img={testImage} 
        backgroundColor='#000000da'
        justifyContent='flex-start'
    >
        {(dataVerdict) && <img className={s.IconBigBackgroung} src={dataVerdict.icon} alt='Status icon'/>}
        {/* <img className={s.IconBigBackgroung} src={RabbitIcon} alt='Status icon'/> */}
        {   (resultPoints) &&
            <CircleBar 
                resultPoints={resultPoints}
                setShowResult={setShowResult}
                width={50}
            />
        }
        {
            (dataVerdict) &&
            <>
            <ResultCard 
                showText={showResult}
                status={dataVerdict.status} 
                description={dataVerdict.description}
            />
            {
            (userState.id) && <ButtonTextIcon 
                caption={'Пройти тест ще раз'} 
                icon={IconReset} 
                onClick={() => navigate(`/test/${params.id}`) }
            />
            }
            </>
        }
        <div style={{marginTop: '5rem'}}></div>
        {   (!userState.id) && 
            (<PreviewCard showText={true}/> )
        } 
    </Container>
  )
}

export default ResultPage