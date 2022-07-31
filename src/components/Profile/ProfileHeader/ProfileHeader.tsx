import React, { FC } from 'react';
import s from './ProfileHeader.module.scss';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '../../../assets/svg/logout-1.svg';

export interface ProfileHeaderProps {
    name: string;
    email: string;
    photoUrl: string;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({name, email, photoUrl}) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }
    
    return (
        <header className={s.headerProfile}>
            <img className={s.avatar} src={photoUrl} alt='Users avatar'/>
            <div className="">
                <h1 className={s.name}>{name}</h1>
                <p className={s.details}>{email}</p>
            </div>
            <div className={s.btnDiv}>
                <button 
                    className={s.btnLogout}
                    type='button' 
                    onClick={onLogout}
                >
                Logout <i><img src={LogoutIcon} alt='icon'/></i>
                </button>
            </div>
        </header>
    )
}

export default ProfileHeader