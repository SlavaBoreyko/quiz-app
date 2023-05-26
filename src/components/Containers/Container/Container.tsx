import React, { FC } from 'react';
import NavSidebar from '../NavSidebar/NavSidebar';
import s from './Container.module.scss';

export interface PropsChildren {
  children: React.ReactNode | React.ReactNode[];
  img?: string;
  justifyContent?: string;
  alignItems?: string;
  backgroundColor?: string;
  locked: boolean;
  fullScreen?: boolean;
}

const Container: FC<PropsChildren> = ({
  children,
  justifyContent,
  alignItems,
  img,
  backgroundColor,
  locked,
  fullScreen,
}) => (
  <div
    className={s.containerBack}
    style={{
      // justifyContent: `${justifyContent}`,
      // justifyContent: 'center',
      alignItems: `${alignItems}`,
      backgroundColor: `${locked ? '#000000cb' : backgroundColor}`,
    }}
  >
    {/* <TestHeader /> */}
    <NavSidebar />
    {locked && <div className={s.iconLock} />}
    {children}
    {img && (
      <>
        <div className={s.filterContainerImg}> </div>
        <img
          className={
            locked ? s.lockedImage : fullScreen ? s.fullScreen : s.backImage
          }
          src={img}
          alt="Background illustration"
        />
      </>
    )}
  </div>
);

export default Container;
