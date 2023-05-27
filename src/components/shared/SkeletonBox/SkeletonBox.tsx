import { Skeleton } from '@mui/material';
import React, { FC } from 'react';

interface SkeletonBoxProps {
  width: string;
  height: string;
}

export const SkeletonBox: FC<SkeletonBoxProps> = ({ width, height }) => (
  <Skeleton
    sx={{
      bgcolor: '#2f363c',
      margin: '1rem 2rem 0rem 0',
      justifyContent: 'flex-start',
    }}
    variant="rounded"
    animation="wave"
    width={width}
    height={height}
  />
);
