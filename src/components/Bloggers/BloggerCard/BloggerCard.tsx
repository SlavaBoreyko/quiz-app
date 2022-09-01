import { FC, useEffect, useState } from 'react';
import s from './BloggerCard.module.scss';
import { useNavigate } from 'react-router-dom';
import ButtonFollowLong from '../../Buttons/ButtonFollowLong/ButtonFollowLong';
import convertFollowersToK from '../../../utils/convertFollowersToK';

export interface BloggerCardProps {
    id: string;
    avatar: string;
    name: string;

    mainBlogFollowers: number;
    mainBlogSoc: string;

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

  mainBlogFollowers,
  mainBlogSoc,
  topics,

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
      <img className={s.avatar} src={avatar} alt='Avatar'/>
      <div className={s.containerDiv}>        
        <div className={s.numberDiv}> 
          <h1 className={s.name}>{name}</h1>
          {/* <ButtonPlay width={'28%'}/> */}



          {/* <div className={s.socBox}>
            <span className={s.numberGold}>{convertFollowersToK(mainBlogFollowers)}K</span>
            <img 
              className={s.socIcon} 
              src={require(`../../../assets/svg/socIcon/${mainBlogSoc}.svg`)} 
              alt={'YouTube'}
            />
          </div> */}
          <p className={s.fontGrey}> {topics}</p>

          <div className={s.socBox}>
            <img 
              className={s.socIcon} 
              src={require(`../../../assets/svg/socIcon/${mainBlogSoc}.svg`)} 
              alt={'YouTube'}
            />
            <span className={s.numberGold}>{convertFollowersToK(mainBlogFollowers)}K</span>
          </div>
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
        </div>
        
      </div>  
    </header>
  );
};

export default BloggerCard;