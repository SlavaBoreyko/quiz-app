import React, { FC } from 'react';
import s from './Reaction.module.scss';

export interface ReactionProps {
    show?: boolean;
    stickerSrc: string;
}

const Reaction:FC<ReactionProps> = ({ show = false, stickerSrc}) => {
  return (
    <div className={s.Div}>
        <img className={ show ? s.stickerShow : s.stickerHidden} src={stickerSrc} alt="Max's reaction"/>
    </div>
  )
}

export default Reaction