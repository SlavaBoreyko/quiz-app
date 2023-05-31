import React, { FC } from 'react';
import s from './ProgressBar.module.scss';

interface ProgressBarProps {
  length: number;
  count: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ length, count }) => {
  const ProgressArray = [...Array(length)].fill(s.progressItem);
  ProgressArray.fill(s.progressItemDone, 0, count);

  document.documentElement.style.setProperty('--qa-amount', `${length}`);

  return (
    <div className={s.line}>
      {ProgressArray.map((active, i) => (
        <div key={i} className={active}></div>
      ))}
    </div>
  );
};
