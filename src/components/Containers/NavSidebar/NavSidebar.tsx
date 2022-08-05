import React, { useState } from 'react';
import s from './NavSidebar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import { toast } from 'react-toastify'

import profileIcon from '../../../assets/svg/personIconActive.svg';
import shareIcon from '../../../assets/svg/share-like-tik.svg';
import logo from '../../../assets/svg/testroom-logo.svg';


const NavSidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    const linkCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Посилання скопійоване')
        // setShareLinkCopied(true);
        // setTimeout(() => {
        //     setShareLinkCopied(false)
        // }, 2000)
    }

    // if(shareLinkCopied) {
    //     toast.success('Посилання скопійоване')
    // }
    
    return (
    <>
        <Link 
            style={{
                position: 'absolute',
                top: '2rem',
                
                alignSelf: 'flex-start',
            }}
            to="/"
        >
            <img 
                style={{
                    height: '3rem',
                }}
                src={logo} 
                alt='TestRoom'
            />
        </Link>
    {( !['/profile'].includes(pathname)) && (
        <>

        <div className={s.sideBarNav} >
            <ButtonNav 
                icon={profileIcon}
                onClick={() => navigate('/profile')}
            />
            {(!['/', '/sign-in'].includes(pathname)) &&
            <ButtonNav 
                icon={shareIcon}
                onClick={linkCopy}
                optionClass={'share'}
            />}
        </div>
        </>
    )}
    </>
  )
}

export default NavSidebar