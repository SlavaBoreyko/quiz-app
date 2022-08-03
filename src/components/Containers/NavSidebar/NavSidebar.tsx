import React, { useState } from 'react';
import s from './NavSidebar.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import profileIcon from '../../../assets/svg/personIconActive.svg';
import shareIcon from '../../../assets/svg/share-like-tik.svg';

// import logo from '../../../assets/test-images/logo-for-all.png';
// import logo from '../../../assets/test-images/logo-3-check.png';
import logo from '../../../assets/test-images/logo-4-message.png';


const NavSidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    const linkCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setShareLinkCopied(true);
        setTimeout(() => {
            setShareLinkCopied(false)
        }, 2000)
    }
    
    return (
    <>
    {( !['/profile', '/sign-in'].includes(pathname)) && (
        <>
        {/* <div> */}
            <img 
                style={{
                    position: 'absolute',
                    top: '1.5rem',
                    height: '3rem',
                    alignSelf: 'flex-start',
                }}
                src={logo} 
            />
        {/* </div> */}
        <div className={s.sideBarNav} >
            <ButtonNav 
                icon={profileIcon}
                onClick={() => navigate('/profile')}
            />
            <ButtonNav 
                icon={shareIcon}
                onClick={linkCopy}
                optionClass={'share'}
            />
        </div>
        </>
    )}
    </>
  )
}

export default NavSidebar