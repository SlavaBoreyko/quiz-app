import { FC, useEffect, useState } from 'react';
import s from './BloggersHeader.module.scss';
import YoutubeIcon from '../../../assets/svg/youtube-01.svg';
import HtmlParser from 'html-react-parser'; 
import BtnRectangle from '../../Profile/BtnRectangle/BtnRectangle';
import ButtonFollow from '../../Buttons/ButtonFollow/ButtonFollow';

export interface BloggersHeaderProps {
    id: string;
    avatar: string;
    name: string;
    mainBlog: string;
    mainBlogFollowers: number;
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
    mainBlog,
    mainBlogFollowers,

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
    }, [followingState])

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
                    <ButtonFollow 
                        caption={followingStateLocal ? 'Following' : '+ Follow'}
                        onClick={() => {
                            setFollowingStateLocal((prev) => !prev);
                            (followingState) ?
                            followHandler('unfollow') :
                            followHandler('follow')
                        }}
                    />
                </div>
                
                <h1 className={s.name}>{name}</h1>
            </div>
            
                    
        </header>

        <div className={s.containerNumbers}>
            <div className={s.numberDiv}> 
                <div className={s.start}>
                    <a 
                        href="https://www.youtube.com/c/%D0%9C%D0%B0%D0%BA%D1%81%D0%B8%D0%BC%D0%94%D0%B8%D0%B2%D0%B5%D1%80%D1%82%D0%B8%D1%82%D0%BE"
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                    
                        <p className={s.fontGold}>{mainBlog}</p> 
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
                    href="https://www.youtube.com/c/%D0%9C%D0%B0%D0%BA%D1%81%D0%B8%D0%BC%D0%94%D0%B8%D0%B2%D0%B5%D1%80%D1%82%D0%B8%D1%82%D0%BE"
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <div className={s.socBox}>
                        <img className={s.socIcon} src={YoutubeIcon} alt={'YouTube'}/>
                        <span className={s.numberGold}>{Math.round(mainBlogFollowers/1000)}K</span>
                    </div>
                </a>
            
                <div>
                    <span className={s.numberGrey}>{followers}</span>
                </div>
                <div>
                    {/* <img className={s.iconForNumber} src={TestIcon} alt={'test'}/> */}
                    <span className={s.numberGrey}>{passedTests}</span>
                </div>
            </div>
            
        </div>
        <p className={s.details}>{description}</p>
        <div
            style={{
                marginBottom: '1rem',
            }}
        ></div>
    </>)
}

export default BloggersHeader