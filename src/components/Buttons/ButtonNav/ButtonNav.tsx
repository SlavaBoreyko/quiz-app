import React, { FC, useEffect, useState } from 'react';
import s from './ButtonNav.module.scss';

interface BtnNavProps {
  icon: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  optionClass?: string;
  background?: boolean;
}

const ButtonNav: FC<BtnNavProps> = ({ 
  icon, 
  onClick, 
  optionClass,
  background,
}) => {
  const [srcIcon, setSrcIcon] = useState<string>('');

  useEffect(() => {
    setSrcIcon(icon);
  }, [icon]);

  return (
    <button 
    
      onClick={onClick}
      className={
        (background && background === true && optionClass === '35%') ? s.btn35Back :
        // s.btnShare has additional padding-left for icon 
          optionClass === 'share' ? s.btnShare : 
            (optionClass === '35%') ? s.btn35 : 
              (optionClass === 'return') ? s.btnReturn : 
                s.btn}
    >
      <img className={s.icon} src={srcIcon} alt='Icon' /> 
    </button>
    
  );
};

export default ButtonNav;