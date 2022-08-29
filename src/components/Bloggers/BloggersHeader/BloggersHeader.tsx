/* eslint-disable max-len */
import { FC, useEffect, useState } from 'react';
import s from './BloggersHeader.module.scss';
import HtmlParser from 'html-react-parser'; 
import ButtonFollow from '../../Buttons/ButtonFollow/ButtonFollow';
import convertFollowersToK from '../../../utils/convertFollowersToK';

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
}) => {    
  const [followingStateLocal, setFollowingStateLocal] = useState<boolean>(false);

  useEffect(() => {
    setFollowingStateLocal(followingState);
  }, [followingState]);

  return (
    <>
      <header className={s.headerProfile} 
      >
        <img className={s.avatar} src={avatar} alt='Avatar'/>
        {/* <div className={s.containerDiv}>
                <p className={s.details}>@{id}</p>
                <h1 className={s.name}>{name}</h1>
            </div>   */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column', 
          }}
        >
          <div
            style={{
              // marginTop: '0.5rem',
              // marginBottom: '0.5rem',
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >   
            <p className={s.details}>@{id}</p>
    
          </div>
                
          <h1 className={s.name}>{name}</h1>
          <ButtonFollow 
            caption={followingStateLocal ? 'Following' : '+ Follow'}
            onClick={() => {
              setFollowingStateLocal((prev) => !prev);
              (followingState) ?
                followHandler('unfollow') :
                followHandler('follow');
            }}
          />
        </div>
            
                    
      </header>

      <div className={s.containerNumbers}>
        <div className={s.numberDiv}> 
          <div className={s.start}>
            <a 
              href={mainBlogLink}
              target="_blank" 
              rel="noopener noreferrer"
            >
                    
              <p className={s.fontGold}>{mainBlogName}</p> 
            </a>
          </div>
          <div className={s.marginTop} >
            {/* Each child in a list should have a unique "key" prop. */}
            {/* <p>{(language === 'or') ? ['Подписчиков', <br/>, 'в TestRoom'] : ['Підписників', <br/>, 'в TestRoom']}</p> */}
            <p>{(language === 'or') ? HtmlParser('Подписчиков <br/>в TestRoom') : HtmlParser('Підписників <br/>в TestRoom')}</p>
                    
          </div>
          <div className={s.marginTop}>
            <p>{(language === 'or') ? HtmlParser('Пройденных<br/>тестов') : HtmlParser('Пройдених<br/>тестів')}</p>
          </div>

          <a 
            href={mainBlogLink}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <div className={s.socBox}>
              <img className={s.socIcon} src={require(`../../../assets/svg/socIcon/${mainBlogSoc}.svg`)} alt={'YouTube'}/>
              <span className={s.numberGold}>{convertFollowersToK(mainBlogFollowers)}K</span>
            </div>
          </a>
            
          <div>
            <span className={s.numberGrey}>{(followers > 10) ? followers : '--'}</span>
          </div>
          <div>
            {/* <img className={s.iconForNumber} src={TestIcon} alt={'test'}/> */}
            <span className={s.numberGrey}>{(passedTests > 1) ? passedTests : '--'}</span>
          </div>
        </div>
            
      </div>
      {(description !== '') && (<p className={s.details}>{description}</p>)}
      <div
        style={{
          marginBottom: '1rem',
        }}
      ></div>
    </>);
};

export default BloggersHeader;