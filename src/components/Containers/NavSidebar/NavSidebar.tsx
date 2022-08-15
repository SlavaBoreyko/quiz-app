import React, { useState } from 'react';
import s from './NavSidebar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import { toast } from 'react-toastify'

import profileIcon from '../../../assets/svg/personIconActive.svg';
import shareIcon from '../../../assets/svg/share-like-tik.svg';
import logo from '../../../assets/svg/testroom-logo.svg';
import TestHeader from '../../Test/TestHeader/TestHeader';
import BtnRectangle from '../../Profile/BtnRectangle/BtnRectangle';


const NavSidebar = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [shareLinkCopied, setShareLinkCopied] = useState(false);

    const linkCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Посилання скопійоване')
    }
    
    return (
    <>
        {
            (!['/', '/profile', '/sign-in', '/developer'].includes(pathname)) ? (
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
                                height: '3rem',
                            }}
                            src={logo} 
                            alt='TestRoom'
                        />
                    </Link>
                    {(!['/developer'].includes(pathname)) && (
                        <BtnRectangle 
                            caption={`> Розробник. Співпраця`} 
                            onClick={() => navigate('/developer')} 
                        />
                    )}
                </div>
            )
        }

        
    {( !['/profile'].includes(pathname)) && (
        // <div className={s.divDeveloper}>
            
            <div className={s.sideBarNav} >
                <ButtonNav 
                    icon={profileIcon}
                    onClick={() => navigate('/profile')}
                />
                {/* Pages for Share Btn */}
                {(!['/developer'].includes(pathname)) &&
                    <ButtonNav 
                        icon={shareIcon}
                        onClick={linkCopy}
                        optionClass={'share'}
                    />
                } 
            </div>
        // </div>
    )}
    </>
  )
}

export default NavSidebar