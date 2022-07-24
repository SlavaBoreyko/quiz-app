import React, { FC } from 'react';
import OAuth from '../../Auth/OAuth';
import s from './PreviewCard.module.scss';

export interface PreviewCardProps {
    showText: boolean;
}


const PreviewCard: FC<PreviewCardProps> = ({
    showText
}) => {
    const previewData = [
        {
            title: 'Визнач свій рівень дівчат',
            image: 'img/man1.png'
        },
        {
            title: 'Твоя справжня роль в стосунках',
            image: 'img/man1.png'
        },
    ]

  return (
    <div className={ (showText) ? s.showText : s.hidden}>
        <div className={s.previewTitle}>
            Більше тестів
        </div>
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