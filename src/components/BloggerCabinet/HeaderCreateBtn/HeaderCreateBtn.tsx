import React, { FC } from 'react';
import s from './HeaderCreateBtn.module.scss';
import ButtonGreyBig from '../../Buttons/ButtonGreyBig/ButtonGreyBig';
import icon18 from '../../../assets/svg/buttons/plus-18.svg';
import icon18unactive from '../../../assets/svg/buttons/unactive/plus-18.svg';
import iconTest from '../../../assets/svg/buttons/test.svg';
import iconTestunactive from '../../../assets/svg/buttons/unactive/test.svg';

interface HeaderCreateBtnProps {
    setCreateTest: any;
    setCreateGame: any;
    createTest: boolean;
    createGame: boolean;
}
const HeaderCreateBtn:FC<HeaderCreateBtnProps> = ({
  createTest,
  setCreateTest,
  createGame,
  setCreateGame,
}) => (
  <div className={s.headerContainerBorderTop}>
    <ButtonGreyBig 
      icon={createTest ? iconTest : iconTestunactive}
      iconHeight={'1.4rem'}
      label={'Create test'}
      active={createTest}
      onClick={() => {
        if(!createTest) setCreateGame(false);
        setCreateTest((prev: any) => !prev); 
        // setCreateGame(prev => !prev);
      }}
    />
    <ButtonGreyBig 
      icon={createGame ? icon18 : icon18unactive}
      iconHeight={'1.7rem'}
      label={'Create game'}
      active={createGame}
      onClick={() => {
        if(!createGame) setCreateTest(false);
        setCreateGame((prev: any) => !prev);
        
        // setCreateTest(prev => !prev); 
      }}
    />
  </div>
);

export default HeaderCreateBtn;