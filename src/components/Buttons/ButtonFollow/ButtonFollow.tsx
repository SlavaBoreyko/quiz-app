import React, { FC } from 'react';
import s from './ButtonFollow.module.scss'

export interface ButtonFollowProps {
    caption: string;
    onClick: any;
}

const ButtonFollow:FC<ButtonFollowProps> = ({
    caption,
    onClick
}) => {
  return (
    <button 
      className={(caption === '+ Follow') ? s.btnFollow : s.btnFollowing} 
      onClick={onClick}
    >
    {caption}
    </button>
  )
}

export default ButtonFollow