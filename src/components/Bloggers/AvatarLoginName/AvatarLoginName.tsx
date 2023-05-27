import React, { FC } from 'react';
import { ButtonFollowWithHandler } from '../ButtonFollowWithHandler/ButtonFollowWithHandler';
import { LoginTitle } from '../LoginTitle/LoginTitle';
import s from './AvatarLoginName.module.scss';

interface AvatarLoginNameProps {
  avatar: string;
  login: string;
  name: string;
}

export const AvatarLoginName: FC<AvatarLoginNameProps> = ({
  avatar,
  login,
  name,
}) => (
  <div className={s.headerProfile}>
    <img className={s.avatar} src={avatar} alt="Avatar" />
    <div className={s.box}>
      <LoginTitle login={login} name={name} />
      <ButtonFollowWithHandler />
    </div>
  </div>
);
