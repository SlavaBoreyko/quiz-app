/* eslint-disable arrow-body-style */
import React, { FC } from 'react';
import s from './ProfileHeader.module.scss';
// import { getAuth } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';

export interface ProfileHeaderProps {
    marginTop?: string;
    photoUrl: string;
    name: string;
    // email: string;
    description: any;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({
  marginTop,
  photoUrl,
  name, 
  description, 
}) => {
//   const auth = getAuth();
//   const navigate = useNavigate();
//   const onLogout = () => {
//     auth.signOut();
//     navigate('/');
//   };
    
  return (
    <header className={s.headerProfile} 
      style={{
        marginTop: `${marginTop}`
      }}
    >

      {(photoUrl) && (<img className={s.avatar} src={photoUrl} alt='Avatar'/>)}
      <div>
        <h1 className={s.name}>{name}</h1>
        {/* <p className={s.details}>{email}</p> */}
        <div className={s.details}>
          {description}
        </div>
      </div>
      {/* <div className={s.btnDiv}>
                <button 
                    className={s.btnLogout}
                    type='button' 
                    onClick={onLogout}
                >
                Logout <i><img src={LogoutIcon} alt='icon'/></i>
                </button>
            </div> */}
    </header>
  );
};

export default ProfileHeader;