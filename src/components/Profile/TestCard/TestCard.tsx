import React, { FC, MouseEventHandler, useEffect, useRef } from 'react';
import s from './TestCard.module.scss';
import { useNavigate } from 'react-router-dom';

export interface TestCardProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  coverImage: string | any; //React element JSX? Node? 
    // Header
    // blogger: SimpleBloggerType;
  bloggerId: string; 
  bloggerName: string; 
  bloggerAvatar: string;
    // Title
  testName: string;
    //Footer and button
  footerText?: any;
  buttonEl?: any;
}

const TestCard: FC<TestCardProps> = ({
  onClick,
  coverImage,

  bloggerId,
  bloggerName, 
  bloggerAvatar,

  testName,
  footerText,
  buttonEl,
}) => {
  const navigate = useNavigate();
  const refImg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(refImg.current) {
      refImg.current.style.backgroundImage = `url("${coverImage}")`;
    }
  }, [refImg.current]);

  return (
    <>
      {
        <div className={s.testCardContainter} onClick={onClick}>
          {/* COVER */}
          <div className={s.coverFrame}>
            <div ref={refImg} className={s.coverOpen} />
            {/* {coverImage} */}
          </div>
          <div className={s.divPaddingContainer}>
            <div className={s.textDiv}>
              <div>
                {/* HEADER */}
                {/* <Link to={`/${bloggerId}`}> */}
                <div 
                  className={s.divCenterBlogger} 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    navigate(`/${bloggerId}`);
                  }
                  }>
                  <img className={s.bloggerAvatar} src={bloggerAvatar} alt={`Ава`}/>
                  <span className={s.bloggerName}>{bloggerName}</span>
                </div>
                {/* </Link> */}

                {/* TITLE */}
                <p className={s.titleTest}>{testName}</p>
              </div>

              {/* FOOTER */}
              <div className={s.divResult}>
                <span className={s.status}>{footerText}</span>
                {/* Radius 24% must be equal to other circle elements for Balance */}
                {buttonEl}
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default TestCard;