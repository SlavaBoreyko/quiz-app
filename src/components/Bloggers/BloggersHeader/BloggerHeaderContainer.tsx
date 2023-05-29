import { FC, ReactNode } from 'react';
import ContainerList from '../../Containers/ContainerList/ContainerList';
import { AvatarLoginName } from '../AvatarLoginName/AvatarLoginName';
import s from './BloggerHeaderContainer.module.scss';

export interface BloggerHeaderContainerProps {
  id: string;
  avatar: string;
  name: string;
  description: string;
  children?: ReactNode;
}

export const BloggerHeaderContainer: FC<BloggerHeaderContainerProps> = ({
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
