import React, { FC } from 'react'
import NavSidebar from '../NavSidebar/NavSidebar';
import s from './Container.module.scss';

export interface PropsChildren {
    children: React.ReactNode | React.ReactNode[];
    img?: string;
    justifyContent?: string;
    backgroundColor?: string;
}

const Container:FC<PropsChildren> = ({
  children, justifyContent, img,
  backgroundColor
}) => {
  return (
    <div className={s.containerBack} 
        style={{ 
          justifyContent: `${justifyContent}`,
          backgroundColor: `${backgroundColor}`
        }} 
    >
      <NavSidebar />
      {children}
      {(img) && <img className={s.backImage} src={img} alt='Background illustration'/>}
    </div>
  )
}

export default Container;