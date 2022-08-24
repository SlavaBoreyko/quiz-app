import { FC } from 'react';
import s from './BloggersHeader.module.scss';
import TestIcon from '../../../assets/svg/heart-check-1.svg';
import YoutubeIcon from '../../../assets/svg/youtube-01.svg';


export interface BloggersHeaderProps {
    id: string;
    avatar: string;
    name: string;
    followers: number;
    passedTests: number;
    description: string;
}

const BloggersHeader: FC<BloggersHeaderProps> = ({
    id,
    avatar,
    name, 
    followers,
    passedTests,
    description, 
}) => {    
    return (
    <>
        <header className={s.headerProfile} 
        >
            <img className={s.avatar} src={avatar} alt='Avatar'/>
            <div className={s.containerDiv}>
                <p className={s.details}>@{id}</p>
                <h1 className={s.name}>{name}</h1>

                {/* <p className={s.details}>YouTube-блог</p>  */}
            </div>  

        </header>

        <div className={s.containerNumbers}>
            <div className={s.numberDiv}> 
                <div className={s.start}>
                    <p className={s.fontGold}>Максим Дівертіто</p> 
                </div>
                <div className={s.marginTop}><p>Підписників в TestRoom</p></div>
                <div className={s.marginTop}><p>Пройдених <br/> тестів</p></div>

                <div>
                    <div className={s.socBox}>
                        <img className={s.socIcon} src={YoutubeIcon} alt={'YouTube'}/>
                        <span className={s.numberGold}>245 K</span>
                    </div>
                </div>
            
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