import React, { FC } from 'react';
import OAuth from '../../Auth/OAuth';
import s from './PreviewCard.module.scss';
import test3Cover from '../../../assets/test-images/relationship-1.jpg';
import test2Cover from '../../../assets/test-images/first-date-1.jpg';

export interface PreviewCardProps {
    showText: boolean;
}


const PreviewCard: FC<PreviewCardProps> = ({
    showText
}) => {
    const previewData = [
        {
            title: 'Олень чи домінатор в стосунках?',
            image: test3Cover,
        },
        {
            title: 'Чи ти достатній звабник на 1 побаченні?',
            image: test2Cover,
        },
    ]

  return (
    <div className={ (showText) ? s.showText : s.hidden}>
        {/* <div className={s.previewTitle}>
            Більше тестів
        </div> */}
        <div className={s.grid3}>
        {
            previewData.map((test, index) => (
                <div key={index}>
                <img 
                    className={s.previewImg}
                    key={index}  
                    src={`${test.image}`}
                    alt='image1' 
                />
                <p className={s.previewTestTitle}>{test.title}</p>
                </div>
            ))
        }
        </div>
        <OAuth />
    </div>
  )
}

export default PreviewCard