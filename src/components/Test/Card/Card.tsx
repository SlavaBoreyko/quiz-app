import React, { FC } from 'react'
import s from './Card.module.scss';

export interface CardProps {
    title: string;
}

const Card: FC<CardProps> = ({title}) => {
  return (
    <div className={s.cardContainer}>
        <p><span>{title}</span></p>
    </div>
  )
}

export default Card