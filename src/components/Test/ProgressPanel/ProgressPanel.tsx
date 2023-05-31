import { FC } from 'react';
import arrowIcon from '../../../assets/svg/arrow-right.svg';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { ProgressCounter } from '../ProgressCounter/ProgressCounter';
import s from './ProgressPanel.module.scss';

export interface ProgressPanelProps {
  question: string;
  length: number;
  count: number;
  nextHandler: () => void;
}

export const ProgressPanel: FC<ProgressPanelProps> = ({
  question,
  length,
  count,
  nextHandler,
}) => (
  <>
    <div className={s.divCounterButton}>
      <ProgressCounter length={length} count={count} />
      <div className={s.question}>
        <p>
          <span>{question}</span>
        </p>
      </div>
      <ButtonNav icon={arrowIcon} onClick={nextHandler} />
    </div>
    <ProgressBar length={length} count={count} />
  </>
);
