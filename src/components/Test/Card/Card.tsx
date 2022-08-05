import React, { FC } from 'react'
import Reaction from '../Reaction/Reaction';
import s from './Card.module.scss';


export interface CardProps {
    title: string;
    reactionShow?: boolean;
    reactionSrc?: string;
}

const Card: FC<CardProps> = ({
  title,
  reactionShow,
  reactionSrc
}) => {
  return (
    <div className={s.cardContainer}>
       <div className={s.reactionDiv}>
        {
          (reactionSrc) && (
            <Reaction 
              show={reactionShow}
              stickerSrc={reactionSrc}
            />
          )
        }

       </div>
        
        <p><span>{title}</span></p>
    </div>
  )
}

export default Card