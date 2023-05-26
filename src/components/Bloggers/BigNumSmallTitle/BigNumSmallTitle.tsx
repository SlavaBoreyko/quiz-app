import { FC } from 'react';
import s from './BigNumSmallTitle.module.scss';

interface BigNumSmallTitleProps {
  line1: string;
  line2?: string;
  num: number;
}

export const BigNumSmallTitle: FC<BigNumSmallTitleProps> = ({
  line1,
  line2,
  num,
}) => (
  <div>
    <p>{line1}</p>
    {line2 ? <p>{line2}</p> : null}
    <span className={s.numberGrey}>{num >= 1 ? num : '--'}</span>
  </div>
);
