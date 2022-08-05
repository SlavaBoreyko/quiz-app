import React from 'react';
import Sticker1 from '../../../assets/stickers/sticker.webp'
import s from './Reaction.module.scss';

const Reaction = () => {
  return (
    <div className={s.Div}>
        <img src={Sticker1} alt="Max's reaction"/>
    </div>
  )
}

export default Reaction