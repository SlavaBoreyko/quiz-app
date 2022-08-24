import React, { FC } from 'react';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import s from './ProgressBar.module.scss';
import arrowIcon from '../../../assets/svg/arrow-right.svg';
import unLockedIcon from '../../../assets/svg/unlocked.svg';
import zoomIcon from '../../../assets/svg/expand-fullscreen.svg';
import Spinner from '../../../assets/gif/Rolling-1s-401px.gif';


export interface ProgressProps {
    question: string;
    amountQA: number;
    current: number;
    nextHandler: () => void;
    isNext: boolean;
    fullScreenBtnHandle: () => void;
}

const ProgressBar:FC<ProgressProps> = ({
    question,
    amountQA, 
    current, 
    nextHandler, 
    isNext,
    fullScreenBtnHandle
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
            <div className={s.question}>
                <p><span>{question}</span></p>
            </div>
            {  (isNext) ? (
                    <ButtonNav 
                        icon={Spinner}
                        optionClass={'spinner'}
                        onClick={nextHandler}
                    />
                ) : (
                    <div style={{ zIndex: '300'}} >
                        {/* <ButtonNav 
                            icon={zoomIcon}
                            optionClass={'35%'}
                            onClick={fullScreenBtnHandle}
                        /> */}
                        <ButtonNav 
                            icon={arrowIcon}
                            onClick={nextHandler}
                        />
                        {/* <ButtonNav 
                            icon={unLockedIcon}
                            optionClass={'share'}
                            onClick={nextHandler}
                        /> */}
                    </div>


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