import React, { FC, MouseEventHandler, useEffect, useRef } from 'react';
import s from './TestCard.module.scss';

import { BloggerShortType } from '../../../types/blogger.types';
import { TestCardHeader } from './TestCardHeader/TestCardHeader';
import { TestCardFooter } from './TestCardFooter/TestCardFooter';

export interface TestCardProps {
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  cover: string;
  blogger: BloggerShortType;
  testName: string;
  footerText?: any;

  price?: number;
  button: any;
}

const TestCard: FC<TestCardProps> = ({
  onClick,
  cover,
  blogger,
  testName,
  footerText,
  price,
  button,
}) => {
  const refImg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refImg.current) {
      refImg.current.style.backgroundImage = `url("${cover}")`;
    }
  }, [refImg.current]);

  return (
    <>
      <div className={s.testCardContainter} onClick={onClick}>
        {/* COVER */}
        <div className={s.coverFrame}>
          <div ref={refImg} className={s.coverOpen} />
        </div>
        <div className={s.divPaddingContainer}>
          <div className={s.textDiv}>
            <div className={s.centerTitle}>
              <TestCardHeader blogger={blogger} />
              <div className={s.titleTest}>
                <p>{testName}</p>
              </div>
            </div>
            <TestCardFooter title={footerText} num={price}>
              {button}
            </TestCardFooter>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestCard;
