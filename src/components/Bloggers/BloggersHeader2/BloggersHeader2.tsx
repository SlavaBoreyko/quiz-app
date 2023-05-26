/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import s from './BloggersHeader.module.scss';
import HtmlParser from 'html-react-parser';
import ButtonFollow from '../../Buttons/ButtonFollow/ButtonFollow';
import convertFollowersToK from '../../../utils/convertFollowersToK';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';

import editIcon from '../../../assets/svg/navigation/edit-pencil-2.svg';
import { useLocation } from 'react-router-dom';
import ContainerList from '../../Containers/ContainerList/ContainerList';
import { BlogBadge } from '../BlogBadge/BlogBadge';
import { MainBlog } from '../types/blogger.types';
import { LoginTitle } from '../LoginTitle/LoginTitle';
import { AvatarLoginName } from '../AvatarLoginName/AvatarLoginName';
import { BigNumSmallTitle } from '../BigNumSmallTitle/BigNumSmallTitle';

export interface BloggersHeaderProps {
  id: string;
  avatar: string;
  name: string;

  mainBlog: MainBlog | null;

  followers: number;
  passedTests: number;

  description: string;
  language: string | null;

  followHandler: any;
  followingState: boolean;
}

export const BloggersHeader2: FC<BloggersHeaderProps> = ({
  id,
  avatar,
  name,

  mainBlog,

  followers,
  passedTests,
  description,
  language,

  followHandler,
  followingState,
}) => (
  <header>
    <ContainerList>
      <div>
        <AvatarLoginName avatar={avatar} login={id} name={name} />
        <div className={s.containerNumbers}>
          <div className={s.numberDiv}>
            <BlogBadge blog={mainBlog} />
            <BigNumSmallTitle
              line1="Підписників"
              line2="в TestRoom"
              num={followers}
            />
            <BigNumSmallTitle
              line1="Пройдених"
              line2="тестів"
              num={passedTests}
            />
          </div>
        </div>
      </div>
      {description !== '' ? (
        <p className={s.description}>{description}</p>
      ) : null}
    </ContainerList>
  </header>
);
