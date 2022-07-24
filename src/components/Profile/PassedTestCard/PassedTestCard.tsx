import React, { FC, MouseEventHandler } from 'react';
import CircleBar from '../../Result/CircleBar/CircleBar';
import s from './PassedTestCard.module.scss';
import RabbitIcon from '../../../assets/svg/rabbit.svg'
import LionIcon from '../../../assets/svg/lion.svg'
import DeerIcon from '../../../assets/svg/deer.svg'

import { useFetchVerdictQuery } from '../../../features/user/userApi';

export interface PassedProps {
    id: string;
    testName: string;
    cover: string;
    points: number;
    onClick: MouseEventHandler<HTMLDivElement>;
}

const PassedTestCard: FC<PassedProps> = ({
    id, points, onClick,
    testName, cover
}) => {
    const {data} = useFetchVerdictQuery({key: id, points});

    console.log('data from PassedTestCard', data);

    return (
        <>
       { (data) &&
        <div className={s.testCardContainter} onClick={onClick}>
            <img className={s.coverTest} src={cover} alt=''/>
            <div className={s.textDiv}>
                <p className={s.titleTest}>{testName}</p>
                <div>
                    
                    <span className={s.status}>{data.text.status}</span>
                </div>
            </div>
            
            
            <div className={s.flexGrow}></div>
            {/* <img className={s.statusIcon} src={DeerIcon} alt='Status icon'/> */}
            <img className={s.statusIcon} src={data.svg} alt='Status icon'/>
            {/* <img className={s.statusIcon} src={LionIcon} alt='Status icon'/> */}

        
            <CircleBar  resultPoints={points} width={18}/>
            
        </div>
       }
       </>
    )
}


export default PassedTestCard