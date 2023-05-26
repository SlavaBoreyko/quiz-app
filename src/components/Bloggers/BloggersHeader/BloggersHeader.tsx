/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import s from './BloggersHeader.module.scss';
import HtmlParser from 'html-react-parser';
import ButtonFollow from '../../Buttons/ButtonFollow/ButtonFollow';
import convertFollowersToK from '../../../utils/convertFollowersToK';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';

import editIcon from '../../../assets/svg/navigation/edit-pencil-2.svg';
import { useLocation } from 'react-router-dom';
import ContainerList from '../../Containers/ContainerList/ContainerList';

export interface BloggersHeaderProps {
  id: string;
  avatar: string;
  name: string;

  mainBlogSoc: string;
  mainBlogName: string;
  mainBlogFollowers: number;
  mainBlogLink: string;

  followers: number;
  passedTests: number;
  description: string;
  language: string | null;

  followHandler: any;
  followingState: boolean;

  isBloggerProfile: boolean;
  setEditMode: any;
}

const BloggersHeader: FC<BloggersHeaderProps> = ({
  id,
  avatar,
  name,

  mainBlogSoc,
  mainBlogName,
  mainBlogFollowers,
  mainBlogLink,

  followers,
  passedTests,
  description,
  language,

  followHandler,
  followingState,

  isBloggerProfile,
  setEditMode,
}) => {
  const { pathname } = useLocation();
  const [editPathname, setEditPathname] = useState<boolean>(false);

  const [followingStateLocal, setFollowingStateLocal] =
    useState<boolean>(false);
  useEffect(() => {
    if (pathname.split('/')[2] === 'edit') setEditPathname(true);
    setFollowingStateLocal(followingState);
  }, [followingState, pathname]);

  return (
    <ContainerList>
      <div>
        <header
          className={s.headerProfile}
          style={
            isBloggerProfile
              ? {
                  marginTop: '0',
                  paddingTop: '0',
                }
              : {}
          }
        >
          <img className={s.avatar} src={avatar} alt="Avatar" />
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '14.5rem',
              flexDirection: 'column',
              justifyContent: isBloggerProfile ? 'space-between' : 'flex-end',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
              }}
            >
              {isBloggerProfile && (
                <ButtonNav
                  icon={editIcon}
                  onClick={() => setEditMode(true)}
                  optionClass={'share'}
                  optionLabel={'Edit'}
                />
              )}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <p className={s.details}>@{id}</p>
              <h1 className={s.name}>{name}</h1>
            </div>

            {!isBloggerProfile && !editPathname && (
              <ButtonFollow
                fill={followingStateLocal ? false : true}
                caption={followingStateLocal ? 'Following' : '+ Follow'}
                onClick={() => {
                  setFollowingStateLocal((prev) => !prev);
                  followingState
                    ? followHandler('unfollow')
                    : followHandler('follow');
                }}
              />
            )}
          </div>
        </header>

        <div className={s.containerNumbers}>
          <div className={s.numberDiv}>
            <div className={s.start}>
              <a href={mainBlogLink} target="_blank" rel="noopener noreferrer">
                <p className={s.fontGold}>{mainBlogName}</p>
              </a>
            </div>
            <div className={s.marginTop}>
              {/* <p>{(language === 'ua') ?  HtmlParser('Підписників <br/>в TestRoom') : HtmlParser('Abonenci <br/>w TestRoom')}</p> */}
              <p>{HtmlParser('Підписників <br/>в TestRoom')}</p>
            </div>
            <div className={s.marginTop}>
              {/* <p>
                {language === 'ua'
                  ? HtmlParser('Пройдених<br/>тестів')
                  : HtmlParser('Testy zdane')}
              </p> */}
              <p>{HtmlParser('Пройдених<br/>тестів')}</p>
            </div>

            <div className={s.desktopFreeSpace} />
            <a
              href={mainBlogLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                justifySelf: 'flex-start',
              }}
            >
              <div className={s.socBox}>
                <img
                  className={s.socIcon}
                  src={require(`../../../assets/svg/socIcon/${mainBlogSoc}.svg`)}
                  alt={'YouTube'}
                />
                <span className={s.numberGold}>
                  {convertFollowersToK(mainBlogFollowers)}K
                </span>
                {/* <span className={s.numberGold}>{mainBlogFollowers}K</span> */}
              </div>
            </a>

            <div>
              <span className={s.numberGrey}>
                {followers > 10 ? followers : '--'}
              </span>
            </div>
            <div>
              {/* <img className={s.iconForNumber} src={TestIcon} alt={'test'}/> */}
              <span className={s.numberGrey}>
                {passedTests > 1 ? passedTests : '--'}
              </span>
            </div>

            <div className={s.desktopFreeSpace} />
          </div>
        </div>
      </div>
      {description !== '' && (
        <p
          className={s.details}
          style={{
            width: '100%',
            textAlign: 'left',
            alignSelf: 'end',
          }}
        >
          {description}
        </p>
      )}
      <div
        style={{
          marginBottom: '1rem',
        }}
      ></div>
    </ContainerList>
  );
};

export default BloggersHeader;
