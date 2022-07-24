import React, { FC } from 'react'
import ButtonHome from '../Profile/ButtonHome/ButtonHome';
import s from './Container.module.scss';

export interface PropsChildren {
    children: React.ReactNode | React.ReactNode[];
    img?: string;
    justifyContent: string;
}

const Container:FC<PropsChildren> = ({children, justifyContent, img}) => {
  return (
    <div className={s.containerBack} style={{ justifyContent: `${justifyContent}`}} >
        <ButtonHome />
        {children}
        {
            (img) && <img className={s.backImage} src={img} alt='Background illustration'/>
        }
    </div>
  )
}

export default Container