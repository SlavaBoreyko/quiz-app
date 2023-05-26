import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonIcon from '../../Buttons/ButtonIcon/ButtonIcon';
import ButtonLabel from '../../Buttons/ButtonLabel/ButtonLabel';
import s from './ExploreNavbar.module.scss';

export interface ExploreNavbarProps {
    categoryList: string;
    toggleListHandler: any;
    setToggleMenGirls: any;
    toggleMenGirls: string;
}

const ExploreNavbar:FC<ExploreNavbarProps> = ({
  categoryList,
  toggleListHandler,
  setToggleMenGirls,
  toggleMenGirls,
}) => {
  const navigate = useNavigate();
  return (
    <div className={s.navbarContainer}>
      <div className={s.groupBtn}>
        <ButtonIcon 
          icon={
            require(`../../../assets/svg/navigation/list-${(categoryList === 'tests') ? 
              'active' : 'unactive'}.svg`)
          }
          onClick={() => {
            toggleListHandler('tests');
          }}
        />
        <ButtonIcon 
          icon={
            require(`../../../assets/svg/navigation/person-${(categoryList === 'bloggers') ? 
              'active' : 'unactive'}.svg`)
          }
          onClick={() => {
            toggleListHandler('bloggers');
          }}
        />
      </div>

      {/* <div className={s.groupBtn}>
        <ButtonLabel
          label=' For Men '
          onClick={() => {
            setToggleMenGirls('men');
            navigate(`men/${categoryList}`);
          }}
          active={toggleMenGirls === 'men'}
        />
        <ButtonLabel
          label=' For Girls '
          onClick={() => {
            setToggleMenGirls('girls');
            navigate(`girls/${categoryList}`);
          }}
          active={toggleMenGirls === 'girls'}
        />
      </div> */}
    </div>
  );
};

export default ExploreNavbar;
