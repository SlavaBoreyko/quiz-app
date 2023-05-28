import React, { FC, MouseEventHandler, useEffect, useRef } from 'react';
import s from './TestCardLock.module.scss';

import ButtonPlay from '../../../Buttons/ButtonPlay/ButtonPlay';
import iconLock from '../../../../assets/svg/lock.svg';
import TestCard from '../TestCard';
import { BloggerShortType } from '../../../../types/blogger.types';

export interface TestCardLockProps {
  editMode?: boolean;
  docId?: string;

  onClick: MouseEventHandler<HTMLDivElement>;
  cover: string;
  blogger: BloggerShortType;
  testName: string;

  picsMini: string[] | undefined;
  footerText: string;
  price?: number;
  button?: any;
}

const TestCardLock: FC<TestCardLockProps> = ({
  editMode,
  docId,

  onClick,
  cover,
  blogger,

  testName,
  picsMini,
  footerText,
  price,
  button,
}) => {
  const refBlurImg = useRef<HTMLDivElement>(null);
  const refIconLock = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refBlurImg.current) {
      refBlurImg.current.style.backgroundImage = `url("${cover}")`;
    }
  }, [refBlurImg.current]);

  useEffect(() => {
    if (refIconLock.current) {
      refIconLock.current.style.backgroundImage = `url("${iconLock}")`;
    }
  }, [refIconLock.current]);

  console.log('testcardlock docId', docId);
  return (
    <TestCard
      onClick={onClick}
      cover={cover}
      // coverImage={
      //   <>
      //     <div ref={refIconLock} className={s.iconLock} />
      //     <div ref={refBlurImg} className={s.coverBlur} />
      //   </>
      // }
      blogger={blogger}
      testName={testName}
      footerText={
        picsMini ? (
          <>
            <div
              style={{
                marginLeft: '2.5rem',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {picsMini.slice(0, 3).map((pic, index) => (
                <img key={index} className={s.picsCircleOpen} src={pic} />
              ))}
              <div style={{ marginLeft: '0.5rem' }}>{footerText}</div>
            </div>
          </>
        ) : (
          <>{footerText}</>
        )
      }
      price={price ? price : undefined}
      button={button ? button : <ButtonPlay width={'24%'} />}
    />
  );
};

export default TestCardLock;
