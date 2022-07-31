import React, { FC, MouseEventHandler } from 'react';
import ButtonPlay from '../ButtonPlay/ButtonPlay';
import s from './NewTestCard.module.scss';

export interface NewTestCardProps {
  id: string; 
  title: string; 
  length: number;
  cover: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const NewTestCard: FC<NewTestCardProps> = ({
  id, title, cover, length, onClick
}) => {
  return (
    <div className={s.testCardContainter} onClick={onClick}>
        <img className={s.coverTest} src={cover} alt='Cover'/>
        <div className={s.textDiv}>
            <p className={s.titleTest}>{title}</p>
            <p className={s.status}><span>{length}</span>запитань</p>
        </div>
        <div className={s.flexGrow}></div>
        <ButtonPlay width={'10rem'}/>
    </div>
  )
}

export default NewTestCard