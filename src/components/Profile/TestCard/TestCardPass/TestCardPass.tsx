import React, { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import CircleBar from '../../../Result/CircleBar/CircleBar';
import s from './TestCardPass.module.scss';

import { useFetchVerdictQuery } from '../../../../features/user/userApi';
import { SimpleBloggerType } from '../../../../types/test.types';
import TestCard from '../TestCard';

export interface TestCardPassProps {
    id: string;
    testName: string;
    cover: string;
    // blogger: SimpleBloggerType;
    bloggerId: string;
    bloggerName: string; 
    bloggerAvatar: string;

    points: number;
    language: string;
    onClick: MouseEventHandler<HTMLDivElement>;
}

const TestCardPass: FC<TestCardPassProps> = ({
    id,
    points, onClick,
    testName, cover,
    bloggerId,
    bloggerName, 
    bloggerAvatar,

    language
}) => {
    // const refImg = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if(refImg.current) {
    //         refImg.current.style.backgroundImage = `url("${cover}")`;
    //     }

    // }, [refImg.current])

    const { data } = useFetchVerdictQuery({ testId: id, points});

    return (
        <TestCard
            onClick={onClick}
            // coverImage={ <div ref={refImg} className={s.coverOpen} /> }
            coverImage={cover}
            bloggerId={bloggerId}
            bloggerName={bloggerName}
            bloggerAvatar={bloggerAvatar}
            testName={testName}
            footerText={data && (language === 'or' ? data.status.or : data.status.ua)}
            buttonEl={data &&
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
}

export default TestCardPass