import React, { FC } from 'react';
import s from './ResultCard.module.scss';

export interface ResultCardProps {
    status: string;
    description: string;
    showText?: boolean;
}

const ResultCard: FC<ResultCardProps> = ({
  status, description, showText
}) => (
  <>
    <div className={ (showText) ? s.showText : s.hidden}>
      <h1 className={s.h1Title}>{status}</h1>
      <p className={s.description}>{description}</p>
    </div>
  </>
);

export default ResultCard;