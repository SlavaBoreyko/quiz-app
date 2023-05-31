import React, { FC } from 'react';
import NavSidebar from '../NavSidebar/NavSidebar';
import s from './Container.module.scss';

export interface PropsChildren {
  children: React.ReactNode | React.ReactNode[];
  img?: string;
  justifyContent?: string;
  alignItems?: string;
  backgroundColor?: string;
}

const Container: FC<PropsChildren> = ({
  children,
  justifyContent,
  alignItems,
  img,
  backgroundColor,
}) => (
  <div
    className={s.containerBack}
    style={{
      alignItems: `${alignItems}`,
      backgroundColor: `${backgroundColor}`,
    }}
  >
    <NavSidebar />
    {children}
    {img && (
      <>
        <div className={s.filterContainerImg}> </div>
        <img
          // className={
          //   locked ? s.lockedImage : fullScreen ? s.fullScreen : s.backImage
          // }
          className={s.backImage}
          src={img}
          alt="Background illustration"
        />
      </>
    )}
  </div>
);

export default Container;
