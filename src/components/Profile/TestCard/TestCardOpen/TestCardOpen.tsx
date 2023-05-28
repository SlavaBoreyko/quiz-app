import React, { FC, MouseEventHandler } from 'react';

import ButtonPlay from '../../../Buttons/ButtonPlay/ButtonPlay';
import TestCard from '../TestCard';
import { BloggerShortType } from '../../../../types/blogger.types';

export interface TestCardOpenProps {
  // onClick:  MouseEventHandler<HTMLDivElement>;
  onClick: MouseEventHandler<HTMLDivElement>;
  cover: string;
  // blogger: SimpleBloggerType;
  blogger: BloggerShortType;
  testName: string;
  // length: number;
  button?: any;
  footerText: string;
}

const TestCardOpen: FC<TestCardOpenProps> = ({
  onClick,
  cover,

  blogger,
  testName,
  // length,
  footerText,
  button,
}) => (
  <TestCard
    onClick={onClick}
    cover={cover}
    blogger={blogger}
    testName={testName}
    footerText={footerText}
    button={button ? button : <ButtonPlay width={'22%'} />}
  />
);

export default TestCardOpen;
