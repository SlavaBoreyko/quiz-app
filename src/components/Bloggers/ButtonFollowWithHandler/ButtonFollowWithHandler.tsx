import React, { useState } from 'react';
import ButtonFollow from '../../Buttons/ButtonFollow/ButtonFollow';

export const ButtonFollowWithHandler = () => {
  const [followingStateLocal, setFollowingStateLocal] =
    useState<boolean>(false);

  return (
    <ButtonFollow
      fill={followingStateLocal ? false : true}
      caption={followingStateLocal ? 'Following' : '+ Follow'}
      onClick={() => {
        setFollowingStateLocal((prev) => !prev);
      }}
    />
  );
};
