import { FC, useEffect, useState } from 'react';
import s from './BloggerCard.module.scss';
import YoutubeIcon from '../../../assets/svg/youtube-01.svg';
import { useNavigate } from 'react-router-dom';
import HtmlParser from 'html-react-parser'; 
import ButtonFollowLong from '../../Buttons/ButtonFollowLong/ButtonFollowLong';

export interface BloggerCardProps {
    id: string;
    avatar: string;
    name: string;
    mainBlog: string;
    mainBlogFollowers: number;
    followers: number;
    passedTests: number;
    topics: string;
    language: string | null;

    followHandler: any;
    followingState: any;
}

const BloggerCard: FC<BloggerCardProps> = ({
  id,
  avatar,
  name, 
  //   mainBlog,
  mainBlogFollowers,

  //   followers,
  passedTests,
  topics,
  language,

  followHandler,
  followingState,
}) => {    
  const navigate = useNavigate();
  const [followingStateLocal, setFollowingStateLocal] = useState<boolean>(false);

  useEffect(() => {
    setFollowingStateLocal(followingState);
  }, [followingState]);

  return (
    <header className={s.headerProfile}  onClick={() => navigate(`/${id}`)}
    >   
      {/* <div 
                style={{ width:'100%', flexShrink: '1',}}
            > */}
      <img className={s.avatar} src={avatar} alt='Avatar'/>
      {/* </div> */}
      {/* <div style={{ flexGrow: '1',}}></div> */}
      <div className={s.containerDiv}>        
        <div className={s.numberDiv}> 
          <h1 className={s.name}>{name}</h1>
          <ButtonFollowLong
            caption={followingStateLocal ? 'Following' : '+ Follow'}
            onClick={(e: any) => {
              e.stopPropagation(); 
              setFollowingStateLocal((prev) => !prev);
              (followingStateLocal) ?
                followHandler('unfollow') :
                followHandler('follow');
            }}
          />

          <div className={s.socBox}>
            <img className={s.socIcon} src={YoutubeIcon} alt={'YouTube'}/>
            <span className={s.numberGold}>{Math.round(mainBlogFollowers/1000)}K</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center'}}>
            <span className={s.numberGrey}>{passedTests}</span>
            <p className={s.marginLeft}>
              {(language === 'or') ? HtmlParser('Пройденных<br/>тестов') : HtmlParser('Пройдених<br/>тестів')}
            </p>
          </div>
          <p className={s.fontGold}>{(language === 'or') ? 'Тематика тестов:' : 'Тематика тестів:'}</p>
          <p className={s.fontGrey}> {topics}</p>
        </div>
      </div>  
    </header>
  );
};

export default BloggerCard;