import React, {
  FC,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useRef,
} from 'react';
import s from './TestCard.module.scss';

import { BloggerShortType } from '../../../types/blogger.types';
import { TestCardCoverImg } from './TestCardCoverImg/TestCardCoverImg';

export interface TestCardProps {
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  cover: string;
  children: ReactElement;
  // blogger: BloggerShortType;
  // testName: string;
  // footerText?: any;

  // price?: number;
  // button: any;
}

const TestCard: FC<TestCardProps> = ({
  onClick,
  cover,
  children,
  // blogger,
  // testName,
  // footerText,
  // price,
  // button,
}) => (
  <>
    <div className={s.testCardContainter} onClick={onClick}>
      <TestCardCoverImg img={cover} />
      <div className={s.divPaddingContainer}>
        <div className={s.textDiv}>
          {children}
          {/* <TestCardHeader blogger={blogger} />
          <TestCardTitle title={testName} />
          <TestCardFooter title={footerText} num={price}>
            {button}
          </TestCardFooter> */}
        </div>
      </div>
    </div>
  </>
);

export default TestCard;
