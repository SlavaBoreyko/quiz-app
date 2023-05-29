import s from './BlogBadge.module.scss';
import convertFollowersToK from '../../../utils/convertFollowersToK';
import { MainBlog } from '../types/blogger.types';

export const BlogBadge = ({ blog }: { blog: MainBlog | null }) => {
  if (!blog) return null;
  // const { socialType, name, followers, link } = blog;
  const { soc, ua, followers, link } = blog;
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        justifySelf: 'flex-start',
      }}
    >
      {ua !== '' ? <p className={s.fontGold}>{ua}</p> : null}
      <div className={s.socBox}>
        <img
          className={s.socIcon}
          src={require(`../../../assets/svg/socIcon/${soc}.svg`)}
          alt={'YouTube'}
        />
        <span className={s.numberGold}>{convertFollowersToK(followers)}K</span>
      </div>
    </a>
  );
};
