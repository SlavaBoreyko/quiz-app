import React, { FC, MouseEventHandler } from 'react';
import CircleBar from '../../../Result/CircleBar/CircleBar';
import s from './TestCardPass.module.scss';

import { useFetchVerdictQuery } from '../../../../features/user/userApi';
import TestCard from '../TestCard';
import { BloggerShortType } from '../../../../types/blogger.types';

export interface TestCardPassProps {
  id: string;
  testName: string;
  cover: string;
  // blogger: SimpleBloggerType;
  blogger: BloggerShortType;

  points: number;
  language: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const TestCardPass: FC<TestCardPassProps> = ({
  id,
  points,
  onClick,
  testName,
  cover,
  blogger,

  language,
}) => {
  // const refImg = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //     if(refImg.current) {
  //         refImg.current.style.backgroundImage = `url("${cover}")`;
  //     }

  // }, [refImg.current])

  const { data } = useFetchVerdictQuery({ testId: id, points });

  return (
    <TestCard
      onClick={onClick}
      // coverImage={ <div ref={refImg} className={s.coverOpen} /> }
      cover={cover}
      blogger={blogger}
      testName={testName}
      footerText={data && (language === 'or' ? data.status.or : data.status.ua)}
      button={
        data && (
          <>
            <img className={s.statusIcon} src={data.icon} alt="Status icon" />
            <CircleBar resultPoints={points} width={4} fontSize={'1.2rem'} />
          </>
        )
      }
    />
  );
};

export default TestCardPass;
