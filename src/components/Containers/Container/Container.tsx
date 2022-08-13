import React, { FC, useEffect, useRef } from 'react'
import NavSidebar from '../NavSidebar/NavSidebar';
import s from './Container.module.scss';

export interface PropsChildren {
    children: React.ReactNode | React.ReactNode[];
    img?: string;
    justifyContent?: string;
    backgroundColor?: string;
    locked: boolean;
    fullScreen?: boolean;
}

const Container:FC<PropsChildren> = ({
  children, justifyContent, img,
  backgroundColor,
  locked,
  fullScreen
}) => {
  return (
    <div className={s.containerBack} 
        style={{ 
          justifyContent: `${justifyContent}`,
          backgroundColor: `${locked ? '#000000cb' : backgroundColor}`,
        }} 
    >
      <NavSidebar />
      {
        locked && ( <div className={s.iconLock} />) 
      }
      {children}
      {(img) && 
          <img className={locked ? s.lockedImage :
            fullScreen ? s.fullScreen : 
            s.backImage} 
          src={img} 
          alt='Background illustration'
          />
      }
    </div>
  )
}

export default Container;