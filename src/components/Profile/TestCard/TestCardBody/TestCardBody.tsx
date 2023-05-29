import React, { FC, ReactNode } from 'react';
import { TestCardHeader } from '../TestCardHeader/TestCardHeader';
import { TestCardTitle } from '../TestCardTitle/TestCardTitle';
import { TestCardFooter } from '../TestCardFooter/TestCardFooter';
import { BloggerShortType } from '../../../../types/blogger.types';

interface TestCardBodyProps {
  blogger: BloggerShortType;
  testName: string;
  footerText?: any;
  price?: number;
  children: ReactNode;
}

export const TestCardBody: FC<TestCardBodyProps> = ({
  blogger,
  testName,
  footerText,
  price,
  children,
}) => (
  <>
    <TestCardHeader blogger={blogger} />
    <TestCardTitle title={testName} />
    <TestCardFooter title={footerText} num={price}>
      {children}
    </TestCardFooter>
  </>
);
