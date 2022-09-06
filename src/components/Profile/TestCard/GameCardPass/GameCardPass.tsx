import React, { FC, MouseEventHandler, useEffect, useState } from 'react';
import s from './GameCardPass.module.scss';
import TestCard from '../TestCard';
import CircleBar from '../../../Result/CircleBar/CircleBar';
import unlockedIcon from '../../../../assets/svg/ui/unlocked.svg';

export interface TestCardPassProps {
  id: string;
  testName: string;
  cover: string;
    // blogger: SimpleBloggerType;
  bloggerId: string;
  bloggerName: string; 
  bloggerAvatar: string;

  answersArrGame: number[];
  openAndLock: string;
  picsMini: string[] | undefined;

  language: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const GameCardPass: FC<TestCardPassProps> = ({
  id,

  onClick,
  testName, cover,
  bloggerId,
  bloggerName, 
  bloggerAvatar,

  answersArrGame,
  picsMini,
  openAndLock, 
  language
}) => {
  const [filtersPics, setFiltersPics] = useState<string[]>([]);
  useEffect(() => {
    if(picsMini) {
      const filtersPics = picsMini.filter((pic, index) => answersArrGame[index] === 1);
      setFiltersPics(filtersPics);
    }
  },[picsMini]);

  return (
    <TestCard
      onClick={onClick}
      coverImage={cover}
      bloggerId={bloggerId}
      bloggerName={bloggerName}
      bloggerAvatar={bloggerAvatar}
      testName={testName}
      footerText={(picsMini) && 
        <div style={{ marginLeft: '2.5rem' }}>
          {
            filtersPics.slice(0,4).map((pic, index) => (
              <img key={index} className={s.picsCircleOpen} src={pic} />
            ))
          }
        </div>
      }
      buttonEl={(
        <>
          <img className={s.statusIcon} src={unlockedIcon} />
          <CircleBar 
            // resultPoints={points} 
            openAndLock={openAndLock}
            width={22}
            fontSize={'1.2rem'}
          />
        </>
      )}
    />
  )
};

export default GameCardPass;