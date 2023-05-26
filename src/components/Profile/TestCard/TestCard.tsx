import React, {
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import s from './TestCard.module.scss';
import { useNavigate } from 'react-router-dom';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import editIcon from '../../../assets/svg/navigation/edit-pencil-2.svg';
import EditCard from '../../BloggerCabinet/EditCard/EditCard';

export interface TestCardProps {
  editMode?: boolean;
  docId?: string;

  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  coverUrl?: string;
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

  price?: number;
  buttonEl?: any;
}

const TestCard: FC<TestCardProps> = ({
  editMode,
  docId,

  onClick,
  coverUrl,
  coverImage,

  bloggerId,
  bloggerName,
  bloggerAvatar,

  testName,
  footerText,
  price,
  buttonEl,
}) => {
  const navigate = useNavigate();
  const refImg = useRef<HTMLDivElement>(null);
  const [openEditCard, setOpenEditCard] = useState<boolean>(false);

  useEffect(() => {
    if (typeof coverImage === 'string' && refImg.current) {
      refImg.current.style.backgroundImage = `url("${coverImage}")`;
    }
  }, [refImg.current]);

  return (
    <>
      {openEditCard ? (
        <EditCard
          docId={docId}
          setOpenEditCard={setOpenEditCard}
          blogger={{
            id: bloggerId,
            avatar: bloggerAvatar,
            name: {
              en: bloggerName,
              pl: bloggerName,
              ua: bloggerName,
              or: bloggerName,
            },
          }}
          // bad <></> JSX no string link
          coverUrl={coverUrl}
          cover={coverImage}
          testName={testName}
          price={price}
        />
      ) : (
        <div className={s.testCardContainter} onClick={onClick}>
          {/* COVER */}
          <div className={s.coverFrame}>
            {typeof coverImage === 'string' && (
              <div ref={refImg} className={s.coverOpen} />
            )}
            {typeof coverImage !== 'string' && <>{coverImage}</>}
          </div>
          <div className={s.divPaddingContainer}>
            <div className={s.textDiv}>
              <div className={s.centerTitle}>
                {/* HEADER */}
                {/* <Link to={`/${bloggerId}`}> */}
                <div
                  className={s.divCenterBlogger}
                  style={editMode ? { marginBottom: '-1rem' } : {}}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/${bloggerId}`);
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      className={s.bloggerAvatar}
                      src={bloggerAvatar}
                      alt={`Ава`}
                    />
                    <span className={s.bloggerName}>{bloggerName}</span>
                  </div>
                  {editMode && (
                    <ButtonNav
                      icon={editIcon}
                      onClick={() => setOpenEditCard(true)}
                      optionClass={'share'}
                      // optionLabel={'Edit'}
                    />
                  )}
                </div>
                {/* </Link> */}

                {/* TITLE */}
                <div className={s.titleTest}>
                  <p>{testName}</p>
                </div>
              </div>

              {/* FOOTER */}
              <div className={s.divResult}>
                <span className={s.status}>{footerText}</span>
                <div className={s.priceNumber}>{price}</div>
                {/* Radius 24% must be equal to other circle elements for Balance */}
                {buttonEl}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestCard;
