import React, { FC } from 'react';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import s from './ProgressBar.module.scss';
import arrowIcon from '../../../assets/svg/arrow-right.svg';

export interface ProgressProps {
    amountQA?: number;
    current?: number;
    nextHandler: () => void;
}

const ProgressBar:FC<ProgressProps> = ({
    amountQA, current, nextHandler
}) => {
    const ProgressArray = [...Array(amountQA)].fill(s.progressItem);
    ProgressArray.fill(s.progressItemDone, 0, current);

    document.documentElement.style.setProperty('--qa-amount', `${amountQA}`)

  return (
    <>
        <div className={s.divCounterButton}>
            <div className={s.divButton}>
                <span className={s.counter}>{current}</span>
                <span className={s.amountQA}>/{amountQA}</span>
            </div>
            {/* <div className={s.divButtonActive}> */}
                {/* <ButtonNav caption='Далі >' onClick={nextHandler}/> */}
                <ButtonNav 
                    icon={arrowIcon}
                    onClick={nextHandler}
                />
            {/* </div> */}
        </div>

        <div className={s.line}>
        {
            ProgressArray.map((active, i) => 
            (<div key={i} className={active}></div>))
        }
        </div>
    </>
  )
}

ProgressBar.defaultProps = {
    amountQA: 15,
    current: 1,
}

export default ProgressBar