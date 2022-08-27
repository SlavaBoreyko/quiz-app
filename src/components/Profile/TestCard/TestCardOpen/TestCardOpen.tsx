import React, { FC, MouseEventHandler } from 'react';

import ButtonPlay from '../../ButtonPlay/ButtonPlay';
import TestCard from '../TestCard';

export interface TestCardOpenProps {
  // onClick:  MouseEventHandler<HTMLDivElement>; 
  onClick: MouseEventHandler<HTMLDivElement>; 
  cover: string;
  // blogger: SimpleBloggerType;
  bloggerId: string; 
  bloggerName: string; 
  bloggerAvatar: string;
  testName: string;
  // length: number;
  button?: any;
  footerText: string;
}

const TestCardOpen: FC<TestCardOpenProps> = ({
  onClick,
  cover,

  bloggerId,
  bloggerName, 
  bloggerAvatar,
  testName, 
  // length,
  footerText,
  button
}) => (
  <TestCard 
    onClick={onClick}
    coverImage={cover}
    bloggerId={bloggerId}
    bloggerName={bloggerName}
    bloggerAvatar={bloggerAvatar}
    testName={testName}
    footerText={footerText}
    buttonEl={ (button) ? button : <ButtonPlay width={'22%'}/>} 
  />
);

export default TestCardOpen;