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
    // length: number;
    button?: any;
    footerText: string;
}

const TestCardOpen: FC<TestCardOpenProps> = ({
    onClick,
    cover,
    blogger, 
    testName, 
    // length,
    footerText,
    button
}) => {

    // const refImg = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if(refImg.current) {
    //         refImg.current.style.backgroundImage = `url("${cover}")`;
    //     }
    // }, [refImg.current])

    return (
        <TestCard 
            onClick={onClick}
            coverImage={cover}
            blogger={blogger}
            testName={testName}
            // footerText={`Питань: ${length}`}
            footerText={footerText}
            buttonEl={ (button) ? button : <ButtonPlay width={'24%'}/>} 
        />
    )
}

export default TestCardOpen