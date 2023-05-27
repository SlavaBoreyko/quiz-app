import React, { FC } from 'react';
import { BlogBadge } from '../BlogBadge/BlogBadge';
import { BigNumSmallTitle } from '../BigNumSmallTitle/BigNumSmallTitle';
import s from './BloggerNumbers.module.scss';
import { MainBlog } from '../types/blogger.types';

interface BloggerNumbersProps {
  mainBlog: MainBlog | null;
  followers: number;
  passedTests: number;
}

export const BloggerNumbers: FC<BloggerNumbersProps> = ({
  mainBlog,
  followers,
  passedTests,
}) => (
  <div className={s.containerNumbers}>
    <div className={s.numberDiv}>
      <BlogBadge blog={mainBlog} />
      <BigNumSmallTitle
        line1="Підписників"
        line2="в TestRoom"
        num={followers}
      />
      <BigNumSmallTitle line1="Пройдених" line2="тестів" num={passedTests} />
    </div>
  </div>
);
