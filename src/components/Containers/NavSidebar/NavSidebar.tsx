/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import s from './NavSidebar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import { toast } from 'react-toastify';

import profileIcon from '../../../assets/svg/personIconActive.svg';
import shareIcon from '../../../assets/svg/share-like-tik.svg';
import editIcon from '../../../assets/svg/navigation/edit-pencil-2.svg';
import logo from '../../../assets/svg/testroom-logo.svg';
import TestHeader from '../../Test/TestHeader/TestHeader';
import BtnRectangle from '../../Buttons/BtnRectangle/BtnRectangle';

import useAnalyticsEventTracker from '../../hooks/useAnalyticsEventTracker';
import SelectOption from '../../Buttons/SelectOption/SelectOption';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addUserLanguage } from '../../../features/user/userSlice';
import { RootState } from '../../../app/store';
import { useFetchBloggerInUserQuery } from '../../../features/user/userApi';

const NavSidebar = () => {

  const userState = useAppSelector((state: RootState) => state.user);
  const {data: dataBlogger} = useFetchBloggerInUserQuery(userState.id);
  const gaEventTracker = useAnalyticsEventTracker('Developer');

  const { pathname} = useLocation();
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
      value: 'pl',
      icon: '🇵🇱',
      title: 'PL',
    },
    {
      value: 'ua',
      icon: '🇺🇦',
      title: 'UA',
    },
    // {
    //   value: 'or',
    //   icon: '🐷',
    //   title: 'ОРК',
    // },
  ]; 

  return (
    <>
      {
        (['test', 'game'].includes(pathname.split('/')[1])) ? (
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
      <div 
        style={{ 
          marginBottom: '1rem',  
          alignSelf: 'flex-end', 
          justifySelf: 'flex-start',
        }}>
        <SelectOption 
          onChange={onChangeLanguage}
          options={languages}
          selected={language ? language : 'pl'}
        />
      </div>

      {(!['/sign-up','/create', '/profile', '/cabinet'].includes(pathname)) && (
        <div className={s.sideBarNav} >
          {['test','game', 'explore'].includes(pathname.split('/')[1])
            && (
              <ButtonNav 
                icon={profileIcon}
                onClick={() => navigate('/profile')}
              />
          )}
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