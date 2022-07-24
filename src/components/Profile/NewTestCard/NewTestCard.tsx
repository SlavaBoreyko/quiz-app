import React, { FC, MouseEventHandler } from 'react';
import ButtonPlay from '../ButtonPlay/ButtonPlay';
import s from './NewTestCard.module.scss';

export interface NewTestCardProps {
  id: string; 
  title: string; 
  length: number;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const NewTestCard: FC<NewTestCardProps> = ({
  id, title, length, onClick
}) => {
  return (
    <div className={s.testCardContainter} onClick={onClick}>
        <img className={s.coverTest} src={'img/man1.png'} alt=''/>
        <div className={s.textDiv}>
            <p className={s.titleTest}>{title}</p>
            <p className={s.status}><span>{length}</span>запитань</p>
        </div>
        <div className={s.flexGrow}></div>
        <ButtonPlay resultPoints={50} width={18}/>
    </div>
  )
}

export default NewTestCard