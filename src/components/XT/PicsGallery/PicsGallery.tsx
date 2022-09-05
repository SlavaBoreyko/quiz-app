import { FC } from 'react';
import s from './PicsGallery.module.scss';
import iconLock from '../../../assets/svg/lock.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export interface PicsGalleryProps {
    pics: string[];
    answers: number[] | undefined;
}

const PicsGallery: FC<PicsGalleryProps> = ({
  pics,
  answers,
}) => {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  return (
    <div className={s.gridGallery}>
      <div className={s.gridGallery} style={{
        position: 'absolute',
        cursor: 'pointer',
        top: '0',
        width: '100%',
        height: '100%',
        zIndex: '200',
      }}>
        { pics.map((pic, index) => (
          (answers && answers[index] === 1) ? (
            <div 
            style={{
                height: '11rem',
            }}
              key={index} 
              onClick={() => 
                navigate('/game/fullscreen', { state: { picSrc: pic } })
              } 
            />
          ) : (
            <Link 
                style={{
                    height: '11rem',
                }}
              key={index} 
              to={`${pathname.substring(0,pathname.lastIndexOf("/"))}/${index + 1}` }
              state={{ attempt: 'second', answersArray: answers }}
            >
              <img 
                className={s.iconLock} 
                src={iconLock}
              />
            </Link>
          )
        ))}
      </div>
      {
        // slice delete
        pics.map((pic, index) => (
          (answers && answers[index] === 1) ? (
            <img 
              key={index} 
              className={s.picImg}
              src={pic} 
              alt={'img'}
            />
          ) : (
            <div key={index} className={s.coverBlur}>
              <img 
                className={s.picImg}
                src={pic} 
                alt={'img'}
              />
            </div>
          )
        ))
      }
    </div>
  );
};

export default PicsGallery;