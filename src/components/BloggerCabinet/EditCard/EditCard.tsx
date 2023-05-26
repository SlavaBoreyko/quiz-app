import React, {
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import s from './EditCard.module.scss';
import { toast } from 'react-toastify';
import cameraIcon from '../../../assets/svg/buttons/camera.svg';
import iconLock from '../../../assets/svg/lock.svg';
import uploadFile from '../../../utils/img/uploadFile';
import { TestCardType } from '../../../types/test.types';
import ButtonFollow from '../../Buttons/ButtonFollow/ButtonFollow';
import {
  useCreateTestCardMutation,
  useUpdateTestCardMutation,
} from '../../../features/test/testApi';
import SelectOption from '../../Buttons/SelectOption/SelectOption';

const CardInitialState = {
  docId: '',
  id: '',
  published: false,
  audience: [],
  cover: '',
  blogger: {
    id: '',
    avatar: '',
    name: {
      en: '',
      pl: '',
      ua: '',
      or: '',
    },
  },
  testName: {
    en: '',
    pl: '',
    ua: '',
    or: '',
  },
  qLength: 0,
  payment: '',
  currency: '',
  price: 0,
  type: 'game',
};

export interface EditCardProps {
  docId?: string;
  setOpenEditCard?: any;
  blogger: {
    id: string;
    avatar: string;
    name: {
      en: string;
      pl: string;
      ua: string;
      or: string;
    };
    audience?: string;
  };
  coverUrl?: string;
  cover?: string | any;
  testName?: string;
  price?: number;
}

const EditCard: FC<EditCardProps> = ({
  docId,
  setOpenEditCard,
  blogger,
  coverUrl,
  cover,
  testName,
  price,
}) => {
  const [createTestCard] = useCreateTestCardMutation();
  const [updateTestCard] = useUpdateTestCardMutation();
  const [cardData, setCardData] = useState<TestCardType>(CardInitialState);
  const [file, setFile] = useState<any>('');
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [previewCover, setPreviewCover] = useState<string | undefined>(
    undefined,
  );
  const [audienceType, setAudienceType] = useState<string>('men');
  const [paymentType, setPaymentType] = useState<string>('paid');
  const [currencyType, setCurrencyType] = useState<string>('');
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const refBlurImg = useRef<HTMLDivElement>(null);
  const refIconLock = useRef<HTMLDivElement>(null);

  const currencyTypeArray = [
    {
      value: 'USD',
      icon: '',
      title: '$',
    },
    {
      value: 'PLN',
      icon: '',
      title: 'zł',
    },
  ];

  // AUTO FILL FORM
  useEffect(() => {
    if (blogger) {
      setCardData((prev) => ({
        ...prev,
        blogger: {
          ...blogger,
        },
      }));
      blogger.audience && setAudienceType(blogger.audience);
    }
  }, [blogger]);

  useEffect(() => {
    if (docId) {
      setCardData((prev) => ({
        ...prev,
        docId: docId,
      }));
    }
    if (coverUrl && file === '') {
      setPreviewCover(coverUrl);
    }
    if (previewCover) {
      setCardData((prev) => ({
        ...prev,
        cover: previewCover,
      }));
    }
    if (testName) {
      setCardData((prev) => ({
        ...prev,
        testName: {
          ...prev.testName,
          pl: testName,
        },
      }));
    }
    setCardData((prev) => ({
      ...prev,
      currency: currencyType,
    }));

    if (price) {
      setCardData((prev) => ({
        ...prev,
        price: price,
      }));
    }
  }, [testName, coverUrl, previewCover, currencyType, price]);
  // //

  useEffect(() => {
    if (file) {
      uploadFile(file, setProgress, setPreviewCover);
    }
  }, [file]);

  useEffect(() => {
    if (refBlurImg.current && previewCover) {
      refBlurImg.current.style.backgroundImage = `url("${previewCover}")`;
    }
  }, [refBlurImg.current, previewCover]);

  useEffect(() => {
    if (!previewCover && refIconLock.current) {
      refIconLock.current.style.backgroundImage = `url("${cameraIcon}")`;
    } else if (previewCover && refIconLock.current) {
      refIconLock.current.style.backgroundImage = `url("${iconLock}")`;
    }
  }, [refIconLock.current, previewCover]);

  useEffect(() => {
    if (cardData.price !== 0) {
      setPaymentType('paid');
    }
  }, [cardData.price]);

  const paymentTypeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      e.preventDefault();
      setPaymentType(e.currentTarget.value);
      if (e.currentTarget.value === 'paid') {
        setCurrencyType('PLN');
        setCardData((prev) => ({
          ...prev,
          payment: 'paid',
        }));
      } else if (e.currentTarget.value === 'free') {
        setCurrencyType('');
        setCardData((prev) => ({
          ...prev,
          payment: 'free',
        }));
      }
    }
  };

  const currencyTypeHandler = (e: any) => {
    setCurrencyType(e.target.value);
  };

  const handleChangePl = (e: any) => {
    setCardData((prev: any) => ({
      ...prev,
      [e.target.name]: { pl: e.target.value },
    }));
  };

  const handleChangeNum = (e: any) => {
    setCardData((prev: any) => ({ ...prev, [e.target.name]: +e.target.value }));
  };

  const validateInput = () => {
    let emptyFields: string[] = [];
    let state: boolean = true;
    if (file === '' && !cover) {
      emptyFields.push('file');
      state = false;
    }
    if (!cardData.testName.pl.trim()) {
      emptyFields.push('testName');
      state = false;
    }
    // validate blogger.avatar, name, id

    setEmptyFields(emptyFields);
    return state;
  };

  const handleSubmit = async (e: any, publishState: boolean) => {
    e.preventDefault();
    const validInput = validateInput();
    if (!validInput) {
      return toast.error('Please fill out all required fields');
    }
    if (validInput) {
      if (docId) {
        updateTestCard({
          docId: docId,
          cardData: { ...cardData, published: publishState },
        });

        setOpenEditCard(false);
      } else {
        createTestCard({ ...cardData, published: publishState });
      }
      setCardData((prev: any) => ({ ...prev, published: publishState }));
    }
  };

  console.log('docId', docId);

  return (
    <div>
      <div className={s.cardMainContainer}>
        <div className={s.testCardContainter}>
          {/* COVER */}
          <div className={s.coverFrame}>
            <label htmlFor={'cover'}>
              <input
                id={'cover'}
                name={'file'}
                type="file"
                onChange={(e) => {
                  const file = (e.target as HTMLInputElement).files;
                  if (file) {
                    setFile(file[0]);
                  }
                }}
              />
              {previewCover ? (
                <>
                  <div ref={refIconLock} className={s.iconLock} />
                  <div ref={refBlurImg} className={s.coverBlur} />
                </>
              ) : (
                <>
                  <div ref={refIconLock} className={s.iconCamera} />
                  <div
                    className={
                      emptyFields.includes('file')
                        ? s.coverUploadError
                        : s.coverUpload
                    }
                  />
                  <p
                    className={s.fontBackgroundColor}
                    style={{
                      position: 'absolute',
                      display: 'flex',
                      width: '14.5rem',
                      bottom: '30%',
                      justifyContent: 'center',
                    }}
                  >
                    Upload a cover 1:1
                  </p>
                </>
              )}
            </label>
          </div>
          <div className={s.divPaddingContainer}>
            <div className={s.textDiv}>
              <div className={s.centerTitle}>
                {/* HEADER */}
                {/* <Link to={`/${bloggerId}`}> */}
                <div className={s.divCenterBlogger}>
                  {blogger && blogger.avatar ? (
                    <img
                      className={s.bloggerAvatar}
                      src={blogger.avatar}
                      alt={`Ава`}
                    />
                  ) : (
                    <div className={s.bloggerAvatar} />
                  )}
                  {blogger && blogger.name.pl ? (
                    <span className={s.bloggerName}>{blogger.name.pl}</span>
                  ) : (
                    <span className={s.bloggerNameTemplate}>
                      {"Blogger's name"}
                    </span>
                  )}
                </div>
                {/* TITLE */}
                <div className={s.alignItemsCenter}>
                  <textarea
                    className={
                      emptyFields.includes('testName')
                        ? s.editTitleError
                        : s.editTitle
                    }
                    name={'testName'}
                    rows={2}
                    placeholder="Title of a game:"
                    value={cardData.testName.pl}
                    onChange={handleChangePl}
                  />
                </div>
              </div>

              {/* FOOTER */}
              <div className={s.divResult} style={{ alignItems: 'flex-end' }}>
                <label
                  className={
                    paymentType === 'free' ? s.paymentTypeOn : s.paymentTypeOff
                  }
                  htmlFor={'free'}
                >
                  <input
                    type="radio"
                    id={'free'}
                    name={'free'}
                    value={'free'}
                    onChange={paymentTypeHandler}
                    checked={paymentType === 'free'}
                  />
                  FREE
                </label>

                <input
                  className={paymentType === 'paid' ? s.inputPrice : ''}
                  type="number"
                  name={'price'}
                  style={{
                    margin: '0rem 0.5rem',
                    paddingBottom: '4px',
                    paddingRight: '0.5rem',
                    fontSize: '2.2rem',
                    textAlign: 'right',
                  }}
                  placeholder={'10'}
                  onChange={handleChangeNum}
                  value={
                    cardData.price === 0
                      ? ''
                      : Number(cardData.price).toString()
                  }
                />
                {/* CURRENCIES */}
                <SelectOption
                  size={'big-coin'}
                  // color={'#adb5bd'}
                  onChange={(e) => {
                    setPaymentType('paid');
                    currencyTypeHandler(e);
                  }}
                  options={currencyTypeArray}
                  selected={currencyType}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <div className={s.editBtnColumn}>
          <button>
            <div className={s.btnIconBack}>
            </div>
            <p className={s.smallText}>Edit</p>
          </button>
          <button>
            <div className={s.btnIconBack}>
            </div>
            <p className={s.smallText}>Delete</p>
          </button>
        </div> */}
      </div>
      <div className={s.footerBtn}>
        <div style={{ marginTop: '0.5rem' }}>
          {/* ANALYTICS */}
          {/* <p className={s.smallFont}>Sell:
            <span className={s.accentWhiteFont}> 0 {cardData.type}s</span>
          </p>
          <p className={s.smallFont}>
            Sum:
            <span className={s.accentFont}> 
              0 {currencyType === 'PLN' ? 'zł' : '$'}
            </span>
          </p> */}
        </div>
        <div className={s.btnSaveContainer}>
          <div
            style={{
              width: '100%',
            }}
          >
            <ButtonFollow
              caption="Save"
              onClick={(e: any) => handleSubmit(e, false)}
              flexGrow={0}
            />
          </div>
          <div style={{ marginRight: '1rem' }} />
          <div
            style={{
              width: '100%',
            }}
          >
            <ButtonFollow
              fill={true}
              caption="Post"
              onClick={(e: any) => handleSubmit(e, true)}
              flexGrow={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
