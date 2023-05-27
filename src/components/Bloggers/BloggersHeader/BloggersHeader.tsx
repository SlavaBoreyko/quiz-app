import { FC, ReactNode } from 'react';
import ContainerList from '../../Containers/ContainerList/ContainerList';
import { AvatarLoginName } from '../AvatarLoginName/AvatarLoginName';
import s from './BloggersHeader.module.scss';

export interface BloggersHeaderProps {
  id: string;
  avatar: string;
  name: string;
  description: string;
  children?: ReactNode;
}

export const BloggersHeader: FC<BloggersHeaderProps> = ({
  id,
  avatar,
  name,
  description,
  children,
}) => (
  <header>
    <ContainerList>
      <div>
        <AvatarLoginName avatar={avatar} login={id} name={name} />
        {children}
      </div>
      <p className={s.description}>{description}</p>
    </ContainerList>
  </header>
);
