import React, { FC } from 'react';
import s from './ButtonFollow.module.scss';

export interface ButtonFollowProps {
    caption: string;
    onClick: any;
    flexGrow?: number;
    fill?: boolean;
    sizeBtn?: 'big' | 'middle' | 'small';
    icon?:string;
}

const ButtonFollow:FC<ButtonFollowProps> = ({
  caption,
  onClick,
  flexGrow,
  fill,
  sizeBtn = 'small',
  icon,
}) => {
  let stylingSize: any;

  switch(sizeBtn) {
  case 'big':
    stylingSize =  s.sizeBig;
    break;
  case 'middle':
    // don't define yet s.sizeMiddle;
    stylingSize =  s.sizeMiddle;
    break;
  default:
    stylingSize =  '';
  }

  return (
    <button 
      className={
        `${fill ? s.btnFill : s.btnUnfill} 
        ${stylingSize}
        ${sizeBtn === 'big' && s.glareAnimate}
        `
      } 
      onClick={onClick}
      style={{
        flexGrow: flexGrow, 
      }}
    >
      <div className={`${sizeBtn === 'big' && s.divWidth}`}>
        {(icon) && <img className={s.icon} src={icon}/>} 
        
        <div className={s.divCenter}
          style={{ borderLeft: `${sizeBtn === 'big' && '1px solid #212529'}`}}
        >
          {caption}
        </div>
      </div>
    </button>
  );
};

export default ButtonFollow;