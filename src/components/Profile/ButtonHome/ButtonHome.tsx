import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import s from './ButtonHome.module.scss';
import personIcon from '../../../assets/svg/personIcon.svg';
import personIconActive from '../../../assets/svg/personIconActive.svg';

const ButtonHome = () => {
    const { pathname } = useLocation();
    console.log(pathname)
  return (
    (pathname === '/profile') ? (<div className={s.btnHomeUnactive}>
        <img className={s.icon} src={personIcon} alt='icon' />
    </div>) :
    (<Link 
        className={s.btnHome}
        to='/profile'>
        <img className={s.icon} src={personIconActive} alt='icon' />
    </Link>)
  )
}

export default ButtonHome