import React, { FC, MouseEventHandler } from 'react';
import s from './TestCard.module.scss';
import { SimpleBloggerType } from '../../../types/test.types';

export interface TestCardProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    coverImage?: any;
    // Header
    blogger: SimpleBloggerType;
    // Title
    testName: string;
    //Footer and button
    footerText?: any;
    buttonEl?: any;
}

const TestCard: FC<TestCardProps> = ({
    onClick,
    coverImage,
    blogger,
    testName,
    footerText,
    buttonEl,
}) => {

    return (
        <>
       { 
        <div className={s.testCardContainter} onClick={onClick}>
            {/* COVER */}
            <div className={s.coverFrame}>
                {coverImage}
                {/* <div ref={refBlurImg} className={s.coverCard} /> */}
            </div>
            <div className={s.divPaddingContainer}>
                <div className={s.textDiv}>
                    <div>
                        {/* HEADER */}
                        <div className={s.divCenterBlogger}>
                            <img className={s.bloggerAvatar} src={blogger?.avatar} alt={`Ава`}/>
                            <span className={s.bloggerName}>{blogger?.name}</span>
                        </div>

                        {/* TITLE */}
                        <p className={s.titleTest}>{testName}</p>
                    </div>

                    {/* FOOTER */}
                    <div className={s.divResult}>
                    <span className={s.status}>{footerText}</span>
                    {/* <span className={s.status}>Хтивок: 2{length}</span> */}
                    {/* Radius 24% must be equal to other circle elements for Balance */}
                    {buttonEl}
                    </div>
                </div>
            </div>
    
        </div>
       }
       </>
    )
}


export default TestCard