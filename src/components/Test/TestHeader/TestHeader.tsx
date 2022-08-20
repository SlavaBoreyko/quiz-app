import s from './TestHeader.module.scss';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetchTestQuery } from '../../../features/test/testApi';
import SelectOption from '../../Buttons/SelectOption/SelectOption';
//After video add DevButton: 
import BtnRectangle from '../../Profile/BtnRectangle/BtnRectangle';

import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import detector from "i18next-browser-languagedetector";

// redux-toolkit
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addUserLanguage } from '../../../features/user/userSlice';
import NavSidebar from '../../Containers/NavSidebar/NavSidebar';

const initLang = (lang: string | null) => {
  i18n
  .use(detector)
  .use(initReactI18next)
  .init({
      lng: lang ? lang : 'ua',
      fallbackLng: 'ua',
      interpolation: { escapeValue: false },
  });
}


const TestHeader = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { data: testData, isLoading, isError, error }  = useFetchTestQuery(params.id!);
  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
  // const { t } = useTranslation();
  const userState = useAppSelector((state: any) => state.user);
  useEffect(() => {
    const languageSet = localStorage.getItem('i18nextLng');
    if(userState.language) {
        setLanguage(userState.language);
    } else if(languageSet) {
        setLanguage(languageSet);
    }
},[userState.language])


  return (
    <>
    {
      (testData) && (
        <>
         
            <div className={s.divHeader}>
              <Link to='/'>
                <img className={s.avatarHeader} src={testData.blogger.avatar} alt={'Avatar'}/>
              </Link> 
              <div className={s.divText}>
                <div className={s.bloggerNamePlusLng}>
                  {/* <span className={s.bloggerName}>{t('bloggerName')}</span> */}
                  <span className={s.bloggerName}>
                    {(language && language === 'or') ? testData.blogger.name.or : testData.blogger.name.ua}
                  </span>
                  {/* <SelectOption 
                        onChange={onChangeLanguage}
                        options={languages}
                        language={language ? language : 'ua'}
                    /> */}
                </div>
                {/* <span className={s.testName}>{t('testName')}</span> */}
                <span className={s.testName}>
                  {(language && language === 'or') ? testData.testName.or : testData.testName.ua}
                </span> 
              </div>
              {/* <NavSidebar /> */}
            </div>
            
          {/* AFTER Max video release */}
          {/* <div 
            style={{
              marginTop: '0.5rem',
            }}
          >
            <BtnRectangle caption={`> Розробник`} onClick={() => navigate('/developer')} />
          </div> */}
        </>
      )
    }
    </>
  )
}

export default TestHeader