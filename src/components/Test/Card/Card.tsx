import { FC } from 'react';
import Reaction from '../Reaction/Reaction';
import s from './Card.module.scss';
import { StickerDataType } from '../QuizLayout/QuizLayout';

export interface CardProps {
  sticker?: StickerDataType;
}

const Card: FC<CardProps> = ({ sticker }) => (
  <div className={s.cardContainer}>
    <div className={s.reactionDiv}>
      {sticker && sticker.img && (
        <Reaction show={sticker.show} stickerSrc={sticker.img} />
      )}
    </div>
  </div>
);

export default Card;
