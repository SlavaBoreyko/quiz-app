import React from 'react';
import s from './TestCardTitle.module.scss';

export const TestCardTitle = ({ title }: { title: string }) => (
  <div className={s.title}>
    <p>{title}</p>
  </div>
);
