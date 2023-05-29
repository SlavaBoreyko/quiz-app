import React, { FC, MouseEventHandler } from 'react';
import CircleBar from '../../../Result/CircleBar/CircleBar';
import s from './TestCardPass.module.scss';

import { useFetchVerdictQuery } from '../../../../features/user/userApi';
import TestCard from '../TestCard';
import { BloggerShortType } from '../../../../types/blogger.types';
import { TestCardBody } from '../TestCardBody/TestCardBody';

export interface TestCardPassProps {
  id: string;
  testName: string;
  cover: string;
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
  const { data } = useFetchVerdictQuery({ testId: id, points });

  if (!data) return null;
  return (
    <TestCard onClick={onClick} cover={cover}>
      <TestCardBody
        blogger={blogger}
        testName={testName}
        footerText={data.status.ua}
      >
        <>
          <img className={s.statusIcon} src={data.icon} alt="Status icon" />
          <CircleBar resultPoints={points} width={4} fontSize={'1.2rem'} />
        </>
      </TestCardBody>
    </TestCard>
  );
};

export default TestCardPass;
