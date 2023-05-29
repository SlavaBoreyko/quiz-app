import React, { FC } from 'react';
import s from './TestCardHeader.module.scss';
import { useNavigate } from 'react-router-dom';

interface i18type {
  ua: string;
  or: string;
  pl: string;
  en: string;
}

export interface BloggerShortType {
  id: string;
  avatar: string;
  name: i18type;
}

interface TestCardHeaderProps {
  blogger: BloggerShortType;
}

export const TestCardHeader: FC<TestCardHeaderProps> = ({ blogger }) => {
  const navigate = useNavigate();
  return (
    <div
      className={s.divCenterBlogger}
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/${blogger.id}`);
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img className={s.bloggerAvatar} src={blogger.avatar} alt={`Ава`} />
        <span className={s.bloggerName}>{blogger.name.ua}</span>
      </div>
    </div>
  );
};
