import React, { FC, useEffect, useState } from 'react';
import s from './AvatarLoginName.module.scss';
import { LoginTitle } from '../LoginTitle/LoginTitle';
import { useLocation } from 'react-router-dom';
import ButtonFollow from '../../Buttons/ButtonFollow/ButtonFollow';

interface AvatarLoginNameProps {
  avatar: string;
  login: string;
  name: string;
}

export const AvatarLoginName: FC<AvatarLoginNameProps> = ({
  avatar,
  login,
  name,
}) => {
  const [followingStateLocal, setFollowingStateLocal] =
    useState<boolean>(false);

  return (
    <div className={s.headerProfile}>
      <img className={s.avatar} src={avatar} alt="Avatar" />
      <div className={s.box}>
        <LoginTitle login={login} name={name} />
        <ButtonFollow
          fill={followingStateLocal ? false : true}
          caption={followingStateLocal ? 'Following' : '+ Follow'}
          onClick={() => {
            setFollowingStateLocal((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
};
