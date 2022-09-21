import React, { FC } from 'react';
import s from './ContainerHint.module.scss';
import faceHint from '../../../assets/static-img/faceHint.jpg';

export interface ContainerHintProps {
    img: string;
    textHint: string;
}

const ContainerHint:FC<ContainerHintProps> = ({
  img,
  textHint,
}) => (
  <>
    <div className={s.borderFrame}> 
      <div className={s.messageContainer}>
        <img className={s.messageAvatar} src={faceHint} />
        <div className={s.messageText}>
          <p className={s.titleHint}>{textHint}</p>
        </div>
      </div>
    
      <div className={s.arrow}/>
    </div>
    <img className={s.imgHint} src={img}/>
  </>
);

export default ContainerHint;