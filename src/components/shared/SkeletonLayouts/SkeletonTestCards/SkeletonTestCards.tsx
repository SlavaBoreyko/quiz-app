import React, { FC } from 'react';
import { SkeletonBox } from '../../SkeletonBox/SkeletonBox';

interface SkeletonTestCardsProps {
  length: number;
  height: string;
}

export const SkeletonTestCards: FC<SkeletonTestCardsProps> = ({
  length,
  height,
}) => (
  <>
    {[...Array(length)].map((_, index) => (
      <SkeletonBox key={index} width="100%" height={height} />
    ))}
  </>
);
