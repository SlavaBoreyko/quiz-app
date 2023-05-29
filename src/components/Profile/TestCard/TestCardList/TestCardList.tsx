import React, { FC, ReactNode } from 'react';
import ContainerList from '../../../Containers/ContainerList/ContainerList';
import TestCard from '../TestCard';
import { TestCardBody } from '../TestCardBody/TestCardBody';
import { SkeletonTestCards } from '../../../shared/SkeletonLayouts';
import { TestCardType } from '../../../../types/test.types';
import { useNavigate } from 'react-router-dom';
import { links } from '../../../../router/routes';

interface TestCardListProps {
  list: TestCardType[] | undefined;
  footerEl: ReactNode;
}

export const TestCardList: FC<TestCardListProps> = ({ list, footerEl }) => {
  const navigate = useNavigate();
  return (
    <ContainerList>
      {list ? (
        list.map((test) => (
          <TestCard
            key={test.id}
            cover={test.cover}
            onClick={() => navigate(links.test.openPageOne(test.id))}
          >
            <TestCardBody
              blogger={test.blogger}
              testName={test.testName.ua}
              footerText={`Питань: ${test.qLength}`}
            >
              {footerEl}
            </TestCardBody>
          </TestCard>
        ))
      ) : (
        <SkeletonTestCards length={4} height="15rem" />
      )}
    </ContainerList>
  );
};
