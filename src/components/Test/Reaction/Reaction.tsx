import React, { FC, useEffect, useState } from 'react';
import s from './Reaction.module.scss';

export interface ReactionProps {
    show?: boolean;
    stickerSrc?: string;
}

const Reaction:FC<ReactionProps> = ({ show, stickerSrc}) => {

  const [ showSticker, setShowSticker] = useState(false);

  const setShowStickerTrue = () => setShowSticker(true);

  useEffect(() => {
    if(show) {
      setTimeout(setShowStickerTrue, 100);
    } else setShowSticker(false);
  }, [show])


  return (
    // <div className={ show ? s.stickerShow : s.stickerHidden}>
    <div>
        <img 
          className={ showSticker ? s.stickerShow : s.stickerHidden} 
          src={stickerSrc} 
          alt="Max's reaction"
        />
    </div>
  )
}

export default Reaction