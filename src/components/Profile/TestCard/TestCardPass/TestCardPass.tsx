import React, { FC, MouseEventHandler, useEffect, useRef } from 'react';
import CircleBar from '../../../Result/CircleBar/CircleBar';
import s from './TestCardPass.module.scss';

import { useFetchVerdictQuery } from '../../../../features/user/userApi';
import { SimpleBloggerType } from '../../../../types/test.types';
import TestCard from '../TestCard';

export interface TestCardPassProps {
    id: string;
    testName: string;
    cover: string;
    blogger: SimpleBloggerType;
    points: number;
    onClick: MouseEventHandler<HTMLDivElement>;
}

const TestCardPass: FC<TestCardPassProps> = ({
    id,
    points, onClick,
    testName, cover,
    blogger,
}) => {
    // Maybe transfer to Profile page? 
    const { data } = useFetchVerdictQuery({ testId: id, points});

    const refImg = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(refImg.current) {
            refImg.current.style.backgroundImage = `url("${cover}")`;
        }
    }, [refImg.current])

    return (
        (data) && (
            <TestCard
                onClick={onClick}
                coverImage={ <div ref={refImg} className={s.coverOpen} /> }
                blogger={blogger}
                testName={testName}
                footerText={data.status}
                buttonEl={
                    <>
                        <img className={s.statusIcon} src={data.icon} alt='Status icon'/>
                        <CircleBar 
                            resultPoints={points} 
                            width={22}
                            fontSize={'1.2rem'}
                        />
                    </>
                }
            />
        )
    )
}

export default TestCardPass