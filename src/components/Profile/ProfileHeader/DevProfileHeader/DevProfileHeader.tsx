import React, { FC } from 'react';
import ProfileHeader from '../ProfileHeader';

export interface DevProfileHeaderProps {
  photoUrl: string;
  name: string;
  email?: string;
  instagram?: string;
  telegram?: string;
  story?: any;
}

const DevProfileHeader: FC<DevProfileHeaderProps> = ({
  photoUrl,
  name, 
  //   email,
  instagram, 
  telegram,
  story,
}) => {
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
    
  return (
    <ProfileHeader 
      marginTop={'0rem'}
      photoUrl={photoUrl} 
      name={name} 
      description={
        <>
          {'Автор і розробник.'}
          <p></p>
          {instagram && (
            <div 
            // className={s.socLink} 
              onClick={() => openInNewTab(instagram)} 
            >
              <p>Instagram: <span>@{instagram.split('/')[3]}</span></p>
            </div>
          )
          }
          {telegram && (
            <div 
            // className={s.socLink}
              onClick={() => openInNewTab(telegram)} 
            >
              Telegram: <span>@{telegram.split('/')[3]}</span>
            </div>
          )}
          <p></p>
          {story}
        </>
      }
    />
  );
};

export default DevProfileHeader;