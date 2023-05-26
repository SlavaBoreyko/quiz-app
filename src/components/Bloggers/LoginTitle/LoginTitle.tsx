import React, { FC } from 'react';
import s from './LoginTitle.module.scss';

interface LoginTitleProps {
  login: string;
  name: string;
}

export const LoginTitle: FC<LoginTitleProps> = ({ login, name }) => (
  <div style={{ marginBottom: '0.5rem' }}>
    <p className={s.details}>@{login}</p>
    <h1 className={s.login}>{name}</h1>
  </div>
);
