import React, { FC } from 'react';
import s from './ProfileHeader.module.scss';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export interface ProfileHeaderProps {
    name: string;
    email: string;
}

const ProfileHeader: FC<ProfileHeaderProps> = ({name, email}) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }
    
    return (
        <header className={s.headerProfile}>
            <div className={s.avatar}></div>
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
                X
                </button>
            </div>
        </header>
    )
}

export default ProfileHeader