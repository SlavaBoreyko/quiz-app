import React, { Children, FC } from 'react';
import s from './ProfileSection.module.scss';

interface ProfileSectionProps {
    title: string;
    children?: React.ReactNode | React.ReactNode[];
}

const ProfileSection: FC<ProfileSectionProps> = ({
    title, children
}) => {
  return (
    <div className={s.profileSection}>
        <p className={s.titleSection}>{title}</p>
        {children}
    </div>
  )
}

export default ProfileSection