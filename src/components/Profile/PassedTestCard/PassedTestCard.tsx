import React, { FC, MouseEventHandler } from 'react';
import CircleBar from '../../Result/CircleBar/CircleBar';
import s from './PassedTestCard.module.scss';

import { useFetchVerdictQuery } from '../../../features/user/userApi';
import { SimpleBloggerType } from '../../../types/test.types';

export interface PassedProps {
    id: string;
    testName: string;
    cover: string;
    blogger: SimpleBloggerType;
    points: number;
    onClick: MouseEventHandler<HTMLDivElement>;
}

const PassedTestCard: FC<PassedProps> = ({
    id, points, onClick,
    testName, cover,
    blogger,
}) => {
    // Maybe transfer to Profile page? 
    const { data } = useFetchVerdictQuery({ testId: id, points});

    return (
        <>
       { (data) &&
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
                        <span className={s.status}>{data.status}</span>
                        <img className={s.statusIcon} src={data.icon} alt='Status icon'/>
                        <CircleBar 
                            resultPoints={points} 
                            width={24}
                            fontSize={'1.4rem'}
                        />
                    </div>
                </div>
            </div>
    
        </div>
       }
       </>
    )
}


export default PassedTestCard