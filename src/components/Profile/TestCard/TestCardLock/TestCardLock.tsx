import React, { FC, MouseEventHandler, useEffect, useRef } from 'react';
import CircleBar from '../../../Result/CircleBar/CircleBar';
import s from './TestCardLock.module.scss';

import { SimpleBloggerType } from '../../../../types/test.types';
import ButtonPlay from '../../ButtonPlay/ButtonPlay';
import iconLock from '../../../../assets/svg/lock.svg';
import TestCard from '../TestCard';

export interface TestCardLockProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    cover: string;
    blogger: SimpleBloggerType;
    testName: string;
    length: number;
    button?: any;
}

const TestCardLock: FC<TestCardLockProps> = ({
    onClick,
    cover,
    blogger, 
    testName, 
    length,
    button
}) => {

    const refBlurImg = useRef<HTMLDivElement>(null);
    const refIconLock = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(refBlurImg.current) {
            refBlurImg.current.style.backgroundImage = `url("${cover}")`;
        }
    }, [refBlurImg.current])

    useEffect(() => {
        if(refIconLock.current) {
            refIconLock.current.style.backgroundImage = `url("${iconLock}")`;
        }
    }, [refIconLock.current])

    return (
        <TestCard 
            onClick={onClick}
            coverImage={
                <>
                    <div ref={refIconLock} className={s.iconLock} />
                    <div ref={refBlurImg} className={s.coverBlur} />
                </>
            }
            blogger={blogger}
            testName={testName}
            footerText={`Хтивок: 2${length}`}
            buttonEl={ (button) ? button : <ButtonPlay width={'24%'}/>} 
        />
    )
}

export default TestCardLock