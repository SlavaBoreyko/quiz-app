import React, { FC } from 'react';
import s from './ButtonNav.module.scss';

interface BtnNavProps {
  icon: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  optionClass?: string;
}

const ButtonNav: FC<BtnNavProps> = ({ 
  icon, onClick, optionClass
}) => {
  return (
    <button 
        // s.btnShare has additional padding-left for icon 
        className={optionClass === 'share' ? s.btnShare : 
                    (optionClass === 'spinner') ? s.btnSpinner : 
                    (optionClass === '35%') ? s.btn35 : 
                     s.btn}
        onClick={onClick}
    >
      <img className={s.icon} src={icon} alt='Icon' /> 
    </button>
    
  )
}

export default ButtonNav;