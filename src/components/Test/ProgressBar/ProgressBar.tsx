import React, { FC } from 'react';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import s from './ProgressBar.module.scss';
import arrowIcon from '../../../assets/svg/arrow-right.svg';
import Spinner from '../../../assets/gif/Rolling-1s-401px.gif';
import TestHeader from '../TestHeader/TestHeader';


export interface ProgressProps {
    amountQA: number;
    current: number;
    nextHandler: () => void;
    isNext: boolean;
}

const ProgressBar:FC<ProgressProps> = ({
    amountQA, current, nextHandler, isNext
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

            {/* <TestHeader /> */}

            {  (isNext) ? (
                    <ButtonNav 
                        icon={Spinner}
                        optionClass={'spinner'}
                        onClick={nextHandler}
                    />
                ) : (
                    <ButtonNav 
                        icon={arrowIcon}
                        onClick={nextHandler}
                    />
                )
            }
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

export default ProgressBar