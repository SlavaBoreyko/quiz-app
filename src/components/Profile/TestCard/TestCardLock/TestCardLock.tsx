import React, { FC, MouseEventHandler, useEffect, useRef } from 'react';
import s from './TestCardLock.module.scss';

import ButtonPlay from '../../../Buttons/ButtonPlay/ButtonPlay';
import iconLock from '../../../../assets/svg/lock.svg';
import TestCard from '../TestCard';

export interface TestCardLockProps {
    onClick: MouseEventHandler<HTMLDivElement>;
    cover: string;
    bloggerId: string; 
    bloggerName: string; 
    bloggerAvatar: string;
    testName: string;

    picsMini: string[] | undefined;
    footerText: string;
    button?: any;
}

const TestCardLock: FC<TestCardLockProps> = ({
  onClick,
  cover,
  bloggerId,
  bloggerName,
  bloggerAvatar,

  testName, 
  picsMini,
  footerText,
  button
}) => {

  const refBlurImg = useRef<HTMLDivElement>(null);
  const refIconLock = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(refBlurImg.current) {
      refBlurImg.current.style.backgroundImage = `url("${cover}")`;
    }
  }, [refBlurImg.current]);

  useEffect(() => {
    if(refIconLock.current) {
      refIconLock.current.style.backgroundImage = `url("${iconLock}")`;
    }
  }, [refIconLock.current]);

  return (
    <TestCard 
      onClick={onClick}
      coverImage={
        <>
          <div ref={refIconLock} className={s.iconLock} />
          <div ref={refBlurImg} className={s.coverBlur} />
        </>
      }
      bloggerId={bloggerId}
      bloggerName={bloggerName}
      bloggerAvatar={bloggerAvatar}
      testName={testName}
      footerText={(picsMini) && 
        <>
          <div 
            style={{ 
              marginLeft: '2.5rem', 
              display: 'flex', 
              alignItems: 'center', 
            }}
          >
            {
              picsMini.slice(0,3).map((pic, index) => (
                <img key={index} className={s.picsCircleOpen} src={pic} />
              ))
            }
            {footerText}
          </div>
        </>
      }
      buttonEl={ (button) ? button : <ButtonPlay width={'24%'}/>} 
    />
  );
};

export default TestCardLock;