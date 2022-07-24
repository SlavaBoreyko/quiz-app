import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '../components/Container/Container'
import CircleBar from '../components/Result/CircleBar/CircleBar'
import PreviewCard from '../components/Result/PreviewCard/PreviewCard';
import ResultCard from '../components/Result/ResultCard/ResultCard';
import { VerdictType, VerdictListType } from '../types/test.types';
import s from '../components/Profile/PassedTestCard/PassedTestCard.module.scss';

// redux-toolkit
import { useFetchAnswersQuery, useFetchVerdictQuery } from '../features/user/userApi';

// actions
import { getVerdict } from '../actions';
import { useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';

// lodash for objects
const _ = require('lodash');


const ResultPage = () => {
    const params = useParams();
    

    const { data: answersData, isLoading, isError, error } = useFetchAnswersQuery();
    // isLoading for Spinner
    const userState = useAppSelector((state: RootState) => state.user);

    const [resultPoints, setResultPoints] = useState<number | undefined>(undefined);
    const [showResult, setShowResult] = useState(false);
    
    useEffect(() => {
        if(answersData) {
            const points = _.get(answersData, `${params.id}.points`);
            setResultPoints(points);
        }
    }, [answersData]);

    // PROPER OR NOT? 
    const testId = params.id!;

    // if userState.demo[testId] doesn't exist than params.id !== testid in demo
    useEffect(() => {
        if(!userState.id && userState.demo && userState.demo[testId]) {
            setResultPoints(userState.demo[testId].points);
        }
    }, [userState]);


    const { data: dataVerdict } = useFetchVerdictQuery({key: testId, points: resultPoints!});
    
    console.log('userState', userState);
    console.log('resultPoints', resultPoints);
    console.log('>> dataVerdict', dataVerdict);

  return (
    <Container justifyContent='center'>
        {(dataVerdict) && <img className={s.IconBigBackgroung} src={dataVerdict.svg} alt='Status icon'/>}
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
            <ResultCard 
                showText={showResult}
                status={dataVerdict.text.status} 
                description={dataVerdict.text.description}
            />
        }
        <div style={{marginTop: '5rem'}}></div>
        {   (!userState.id) && 
            (<PreviewCard showText={true}/> )
        } 
    </Container>
  )
}

export default ResultPage