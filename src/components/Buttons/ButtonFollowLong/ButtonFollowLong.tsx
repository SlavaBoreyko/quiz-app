import React, { FC } from 'react';
import s from './ButtonFollowLong.module.scss';

export interface ButtonFollowLongProps {
    caption: string;
    onClick: any;
}

const ButtonFollowLong:FC<ButtonFollowLongProps> = ({
  caption,
  onClick
}) => (
  <button 
    className={(caption === '+ Follow') ? s.btnFollow : s.btnFollowing} 
    onClick={onClick}
  >
    {caption}
  </button>
);

export default ButtonFollowLong;