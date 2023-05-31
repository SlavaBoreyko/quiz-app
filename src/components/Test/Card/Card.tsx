import { FC } from 'react';
import Reaction from '../Reaction/Reaction';
import s from './Card.module.scss';

export interface CardProps {
  reactionShow?: boolean;
  reactionSrc?: string;
}

const Card: FC<CardProps> = ({ reactionShow, reactionSrc }) => (
  <div className={s.cardContainer}>
    <div className={s.reactionDiv}>
      {reactionSrc && <Reaction show={reactionShow} stickerSrc={reactionSrc} />}
    </div>
  </div>
);

export default Card;
