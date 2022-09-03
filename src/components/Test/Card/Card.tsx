import React, { FC } from 'react';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import Reaction from '../Reaction/Reaction';
import s from './Card.module.scss';
import zoomIcon from '../../../assets/svg/expand-fullscreen.svg';
import lockIcon from '../../../assets/svg/ui/lock.svg';
import { useLocation } from 'react-router-dom';

export interface CardProps {
    reactionShow?: boolean;
    reactionSrc?: string;

    fullScreenBtnHandle?: () => void;
    locked?: boolean;
    backBtnToggle?: boolean;
}

const Card: FC<CardProps> = ({
  // title,
  reactionShow,
  reactionSrc,

  locked,
  backBtnToggle,
  fullScreenBtnHandle,
}) => {
  const { pathname } = useLocation();
  
  return (
    <div className={s.cardContainer}>
      <div className={s.lockFullScreenBtn}>
        {(pathname.split('/')[1] === 'xtivka') && (
          <ButtonNav 
            icon={locked ? lockIcon : zoomIcon}
            optionClass={locked ? '' : '35%'}
            background={backBtnToggle}
            onClick={fullScreenBtnHandle ? fullScreenBtnHandle : () => {}}
          />
        )}
      </div>
      <div className={s.reactionDiv}>
        {
          (reactionSrc) && (
            <Reaction 
              show={reactionShow}
              stickerSrc={reactionSrc}
            />
          )
        }
      </div>
    </div>
  );};

export default Card;