import React, { FC, ReactNode } from 'react';
import s from './ContainerList.module.scss';

export interface ContainerListProps {
    children: ReactNode;
}

const ContainerList:FC<ContainerListProps> = ({
  children
}) => (
  <>
    <div className={s.gridDesktopList}>
      {children}
    </div>
    <div className={s.flexGrow}/>
  </>
);

export default ContainerList;