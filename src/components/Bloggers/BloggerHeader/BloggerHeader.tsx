import React, { FC } from 'react';
import { BloggerHeaderContainer } from '../BloggersHeader/BloggerHeaderContainer';
import { BloggerMetrics } from '../BloggerMetrics/BloggerMetrics';
import { BloggerBigType } from '../../../types/test.types';
import { SkeletonBloggerHeader } from '../../shared/SkeletonLayouts';

interface BloggerHeaderProps {
  blogger: BloggerBigType | undefined;
}

export const BloggerHeader: FC<BloggerHeaderProps> = ({ blogger }) => (
  <>
    {blogger ? (
      <BloggerHeaderContainer
        id={blogger.id}
        key={blogger.id}
        avatar={blogger.avatar}
        name={blogger.name.ua}
        description={blogger.description.ua}
      >
        <BloggerMetrics
          mainBlog={blogger.mainBlog}
          followers={blogger.followers}
          passedTests={blogger.passedTests}
        />
      </BloggerHeaderContainer>
    ) : (
      <SkeletonBloggerHeader />
    )}
  </>
);
