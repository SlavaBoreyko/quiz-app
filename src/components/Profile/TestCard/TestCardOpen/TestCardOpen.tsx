import React, { FC, MouseEventHandler, useEffect, useRef } from 'react';
import s from './TestCardOpen.module.scss';

import { SimpleBloggerType } from '../../../../types/test.types';
import ButtonPlay from '../../ButtonPlay/ButtonPlay';
import TestCard from '../TestCard';

export interface TestCardOpenProps {
    // onClick:  MouseEventHandler<HTMLDivElement>; 
    onClick: MouseEventHandler<HTMLDivElement>; 
    cover: string;
    // blogger: SimpleBloggerType;
    bloggerName: string; 
    bloggerAvatar: string;
    testName: string;
    // length: number;
    button?: any;
    footerText: string;
}

const TestCardOpen: FC<TestCardOpenProps> = ({
    onClick,
    cover,
    bloggerName, 
    bloggerAvatar,
    testName, 
    // length,
    footerText,
    button
}) => {

    return (
        <TestCard 
            onClick={onClick}
            coverImage={cover}
            bloggerName={bloggerName}
            bloggerAvatar={bloggerAvatar}
            testName={testName}
            footerText={footerText}
            buttonEl={ (button) ? button : <ButtonPlay width={'22%'}/>} 
        />
    )
}

export default TestCardOpen