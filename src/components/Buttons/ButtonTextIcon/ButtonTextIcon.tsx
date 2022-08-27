import React, { FC } from 'react';
import s from './ButtonTextIcon.module.scss';

export interface ButtonProps {
    caption: string;
    icon?: string;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ButtonTextIcon: FC<ButtonProps> = ({
  caption, icon, onClick
}) => (
  // <div className={s.divButtonActive}>
  <button className={s.transparentBtn} onClick={onClick}>
    {
      (icon) && (<img className={s.iconBtn} src={icon} alt='icon'/>)
    }
           
    {caption}
  </button> 
        
  // </div>
    
);

export default ButtonTextIcon;