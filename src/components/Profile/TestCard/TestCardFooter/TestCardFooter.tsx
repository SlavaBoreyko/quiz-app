import React, { FC, ReactNode } from 'react';
import s from './TestCardFooter.module.scss';

interface TestCardFooterProps {
  title: string;
  num?: number;
  children: ReactNode;
}

export const TestCardFooter: FC<TestCardFooterProps> = ({
  title,
  num,
  children,
}) => (
  <div className={s.cardFooter}>
    <span className={s.title}>{title}</span>
    {num ? <div className={s.number}>{num}</div> : null}
    {children}
  </div>
);
