import React from 'react';
import s from './SkeletonBloggerHeader.module.scss';
import ContainerList from '../../../Containers/ContainerList/ContainerList';
import { SkeletonBox } from '../../SkeletonBox/SkeletonBox';

export const SkeletonBloggerHeader = () => (
  <ContainerList>
    <div>
      <SkeletonBox width="100%" height="15rem" />
      <SkeletonBox width="100%" height="7rem" />
    </div>
    <div>
      <div className={s.desktopAddedSpace}></div>
      <SkeletonBox width="100%" height="7rem" />
    </div>
  </ContainerList>
);
