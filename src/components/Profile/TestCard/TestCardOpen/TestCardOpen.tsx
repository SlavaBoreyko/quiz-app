import React, { FC, MouseEventHandler } from 'react';
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

    return (
        <TestCard 
            onClick={onClick}
            coverImage={ <img className={s.coverOpen} src={cover} alt='Cover'/> }
            blogger={blogger}
            testName={testName}
            footerText={`Питань: 2${length}`}
            buttonEl={<ButtonPlay width={'24%'}/>}
        />
    )
}

export default TestCardOpen