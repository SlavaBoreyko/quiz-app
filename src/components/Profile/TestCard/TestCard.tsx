import React, { FC, MouseEventHandler } from 'react';
import CircleBar from '../../Result/CircleBar/CircleBar';
import s from './TestCard.module.scss';

import { useFetchVerdictQuery } from '../../../features/user/userApi';
import { SimpleBloggerType } from '../../../types/test.types';
import ButtonPlay from '../ButtonPlay/ButtonPlay';

export interface TestCardProps {
    id: string;
    testName: string;
    cover: string;
    blogger: SimpleBloggerType;
    length: number;
    // points: number;
    onClick: MouseEventHandler<HTMLDivElement>;
}

const TestCard: FC<TestCardProps> = ({
    id, onClick,
    testName, cover,
    blogger, length
}) => {


    return (
        <>
       { 
        <div className={s.testCardContainter} onClick={onClick}>
            <img className={s.coverTest} src={cover} alt=''/>
            <div className={s.divPaddingContainer}>
                <div className={s.textDiv}>
                    <div>
                        <div className={s.divCenterBlogger}>
                            <img className={s.bloggerAvatar} src={blogger?.avatar} alt={`Аватарка ${blogger?.name}`}/>
                            <span className={s.bloggerName}>{blogger?.name}</span>
                        </div>
                        <p className={s.titleTest}>{testName}</p>
                    </div>
                    <div className={s.divResult}>
                    <span className={s.status}>Питань: {length}</span>
                    {/* Radius 24% must be equal to other circle elements for Balance */}
                    <ButtonPlay width={'24%'}/>
                    </div>
                </div>
            </div>
    
        </div>
       }
       </>
    )
}


export default TestCard