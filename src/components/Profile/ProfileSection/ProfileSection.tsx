import React, { FC } from 'react';
import s from './ProfileSection.module.scss';

interface ProfileSectionProps {
    title: string;
    description?: string;
    children?: React.ReactNode | React.ReactNode[];
}

const ProfileSection: FC<ProfileSectionProps> = ({
  title, description, children
}) => (
  <div className={s.profileSection}>
    <p className={s.title}>{title}</p>
    {children}
    {(description) && 
          <p className={s.description}>{description}</p>
    }
  </div>
);

export default ProfileSection;