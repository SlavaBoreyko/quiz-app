import React, { FC } from 'react';
import s from './ProgressCounter.module.scss';

interface ProgressCounterProps {
  count: number;
  length: number;
}

export const ProgressCounter: FC<ProgressCounterProps> = ({
  count,
  length,
}) => (
  <div className={s.circle}>
    <span className={s.count}>{count}</span>
    <span className={s.lengthQA}>/{length}</span>
  </div>
);
