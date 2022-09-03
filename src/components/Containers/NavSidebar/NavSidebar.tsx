/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import s from './NavSidebar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import { toast } from 'react-toastify';

import profileIcon from '../../../assets/svg/personIconActive.svg';
import shareIcon from '../../../assets/svg/share-like-tik.svg';
import logo from '../../../assets/svg/testroom-logo.svg';
import TestHeader from '../../Test/TestHeader/TestHeader';
import BtnRectangle from '../../Buttons/BtnRectangle/BtnRectangle';

import useAnalyticsEventTracker from '../../hooks/useAnalyticsEventTracker';
import SelectOption from '../../Buttons/SelectOption/SelectOption';
import { useAppDispatch } from '../../../app/hooks';
import { addUserLanguage } from '../../../features/user/userSlice';

const NavSidebar = () => {

  const gaEventTracker = useAnalyticsEventTracker('Developer');

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const linkCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Посилання скопійоване');
  };

  const dispatch = useAppDispatch();
  const [language, setLanguage] = useState('');
  // const { t } = useTranslation();
  useEffect(() => {
    const languageSet = localStorage.getItem('i18nextLng');
    languageSet && setLanguage(languageSet);
  },[]);
  
  // useEffect(() => {
  //   language && i18n.changeLanguage(language);
  // }, [language])
  
  const onChangeLanguage = (e: any) => {
    setLanguage(e.target.value);
    dispatch(addUserLanguage(e.target.value));
    localStorage.setItem('i18nextLng', e.target.value);
  };
  
  const languages = [
    {
      value: 'ua',
      icon: '🦁',
      title: 'УКР',
    },
    {
      value: 'or',
      icon: '🐷',
      title: 'ОРК',
    },
  ]; 

  return (
    <>
      {
        (pathname.split('/')[1] === 'test') ? (
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
              width: '100%',
              alignSelf: 'flex-start',
            }}
          >
            <TestHeader />
          </div>
        ) : (
          <div className={s.divDeveloper}>
            <Link to="/">
              <img 
                style={{
                  // height: '3rem',
                  width: '14.5rem',
                }}
                src={logo} 
                alt='TestRoom'
              />
            </Link>
            {/* {(!['/developer'].includes(pathname)) && (
              <BtnRectangle 
                caption={(language === 'or') ? `> Для блогеров` :`> Для блогерів`} 
                onClick={
                  () => { 
                    gaEventTracker('Click on a DevInfo');
                    navigate('/developer');
                  }
                } 
              />
            )} */}
          </div>
        )
      }

      <SelectOption 
        onChange={onChangeLanguage}
        options={languages}
        language={language ? language : 'ua'}
      />

      {(!['/profile'].includes(pathname)) && (
        <div className={s.sideBarNav} >
          <ButtonNav 
            icon={profileIcon}
            onClick={() => navigate('/profile')}
          />
          {/* Pages for Share Btn */}
          
          {/* {(pathname.split('/')[1] === 'test') && */}
          {( !['profile', 'explore'].includes(pathname.split('/')[1]) ) && (
            <ButtonNav 
              icon={shareIcon}
              onClick={linkCopy}
              optionClass={'share'}
            />
          )} 
        </div>
      )}
    </>
  );
};

export default NavSidebar;