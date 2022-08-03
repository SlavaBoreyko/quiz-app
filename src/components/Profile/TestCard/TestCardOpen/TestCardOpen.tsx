import React, { FC, MouseEventHandler, useEffect, useRef } from 'react';
import s from './TestCardOpen.module.scss';

import { SimpleBloggerType } from '../../../../types/test.types';
import ButtonPlay from '../../ButtonPlay/ButtonPlay';
import TestCard from '../TestCard';

export interface TestCardOpenProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    cover: string;
    blogger: SimpleBloggerType;
    testName: string;
    length: number;
}

const TestCardOpen: FC<TestCardOpenProps> = ({
    onClick,
    cover,
    blogger, 
    testName, 
    length
}) => {

    const refImg = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(refImg.current) {
            refImg.current.style.backgroundImage = `url("${cover}")`;
        }
    }, [refImg.current])

    return (
        <TestCard 
            onClick={onClick}
            coverImage={ <div ref={refImg} className={s.coverOpen} /> }
            blogger={blogger}
            testName={testName}
            footerText={`Питань: ${length}`}
            buttonEl={<ButtonPlay width={'24%'}/>}
        />
    )
}

export default TestCardOpen