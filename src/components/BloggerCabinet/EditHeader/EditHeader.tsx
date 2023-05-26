/* eslint-disable max-len */
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import s from './EditHeader.module.scss';
// NEW
import { toast } from 'react-toastify';
import { useCreateNewBloggerMutation, useUpdateBloggerByIdMutation } from '../../../features/blogger/bloggerApi';
import { RootState } from '../../../app/store';
import { useAppSelector } from '../../../app/hooks';
import uploadFile from '../../../utils/img/uploadFile';
import { bloggerDataType } from '../../../pages/BloggerCreatePage';

import iconCamera from '../../../assets/svg/buttons/camera.svg';
import iconCameraWhite from '../../../assets/svg/buttons/camera-white.svg';
import saveIcon from '../../../assets/svg/navigation/save-disk.svg';
import ButtonNav from '../../Buttons/ButtonNav/ButtonNav';
import SelectOption from '../../Buttons/SelectOption/SelectOption';
import { BloggerBigType } from '../../../types/test.types';
import { useNavigate } from 'react-router-dom';
import { useAddBloggerIdToUserMutation } from '../../../features/user/userApi';


const socialIcons = [
  'instagram',
  'tiktok',
  'youtube',
  'onlyfans',
];

export interface EditHeaderProps {
  bloggerId?: string;
  setEditMode?: any;
  formData: BloggerBigType;
  setFormData: Dispatch<SetStateAction<BloggerBigType>>;
}

export interface DataIdNewBloggerType {
  id: string;
}

const EditHeader: FC<EditHeaderProps> = ({
  bloggerId,
  formData, 
  setFormData,
  setEditMode,
}) => {
  // email from userState.email 
  // id from userState.id - but use collection('bloggers') update doc 
  const navigate = useNavigate();
  const userState = useAppSelector((state: RootState) => state.user);
  const [social, setSocial] = useState('instagram');
  const [file, setFile] = useState<any>('');
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const [previewAvatar, setPreviewAvatar] = useState<string | undefined>(undefined);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const [ createNewBlogger ] = useCreateNewBloggerMutation();
  const [ addBloggerIdToUser ] = useAddBloggerIdToUserMutation();
  const [ updateBloggerById ] = useUpdateBloggerByIdMutation();

  const [audienceCore, setAudienceCore] = useState<string>('men');
  const audienceIcon = [
    {
      value: 'men',
      icon: '',
      title: 'MEN',
    },
    {
      value: 'girls',
      icon: '',
      title: 'GIRLS',
    },
    {
      value: 'men,girls',
      icon: '',
      title: 'BOTH',
    },
  ]; 
  const onChangeAudience = (e: any) => {
    setAudienceCore(e.target.value);
  };

  useEffect(() => {
    (formData.mainBlog.soc !== '') && setSocial(formData.mainBlog.soc);
    (formData.avatar) && setPreviewAvatar(formData.avatar);
    (formData.audience) && (formData.audience[0] !== '') && setAudienceCore(formData.audience.toString());
  }, []);

  useEffect(() => {
    if(file) {
      uploadFile(file, setProgress, setPreviewAvatar);
    }
  }, [file]);

  useEffect(() => {
    if(previewAvatar) {
      setFormData((prev) => ({...prev, avatar: previewAvatar}));
    }
  }, [previewAvatar]);

  const handleChange = (e: any) => {
    if(e.target.type === 'number') {
      setFormData((prev: any) => (
        {...prev, [e.target.name]: +e.target.value }
      ));
    } else {
      setFormData((prev: any) => (
        {...prev, [e.target.name]: e.target.value }
      ));
    }
  };

  const handleChangePl = (e: any) => {
    setFormData((prev: any) => (
      {...prev, [e.target.name]: { pl: e.target.value } }
    ));
  };

  const socialHandler = (e: React.ChangeEvent<HTMLInputElement>) => {  
    if (e.target.checked) {
      e.preventDefault();
      setSocial(e.currentTarget.value);
    }
  }; 

  const handleChangeMainBlog = (e: any) => {
    if(e.target.type === 'number') {
      setFormData((prev: any) => (
        {...prev, 
          mainBlog: {
            ...prev.mainBlog,
            [e.target.name]: +e.target.value,
          }
        }
      ));
    } else {
      setFormData((prev: any) => (
        {...prev, 
          mainBlog: {
            ...prev.mainBlog,
            [e.target.name]: e.target.value,
          }
        }
      ));
    }
  };

  const validateInput = () => {
    let emptyFields: string[] = [];
    let state: boolean = true;
    if (!previewAvatar && file === '') { 
      emptyFields.push('file'); 
      state = false;
    }
    if (!formData.id.trim()) { 
      emptyFields.push('id'); 
      state = false;
    }
    if (!formData.name.pl.trim()) { 
      emptyFields.push('name'); 
      state = false;
    }

    setEmptyFields(emptyFields);
    return state;
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    
    setFormData((prev: any) => (
      {...prev, mainBlog: 
        {...prev.mainBlog, 
          soc: social 
        }
      }
    ));

    const validInput = validateInput();
    if (!validInput) {
      return toast.error('Please fill out all required fields');
    }
    setEditMode && setEditMode(false);
    const audienceArray = 
      (audienceCore.split(',')[0] === '') ? [audienceCore] : [...audienceCore.split(',')];

    if(validInput && userState.id && userState.email) {
      const formDataCompound = {...formData, 
        userId: userState.id,
        userEmail: userState.email,
        audience: audienceArray,
        topics: '',
        mainBlog: 
        {...formData.mainBlog, 
          soc: social 
        }
      };
      console.log('[audienceCore]', [audienceCore]);

      if(bloggerId) {
        updateBloggerById({bloggerId, formData: formDataCompound});
      } 
      else if(setEditMode === undefined) {
        const data = createNewBlogger(formDataCompound);
        console.log(' data from createNewBlogger(formDataCompound) = ')
        // const { id } = data as <{ data: any; } | { error: unknown; }>;
        addBloggerIdToUser({userId: userState.id, blogger: {
          // id: '',
          nickname: formData.id,
        }});
        navigate(`/${formData.id}/edit`,);
      }
    }
  };

  return (
    <>
      <form>
        <header className={s.headerProfile} 
        >
          <label htmlFor={'big-avatar'} >
            <input 
              id={'big-avatar'} 
              name={'file'}
              className={s.avatar} 
              type='file' 
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files;
                if(file) {
                  setFile(file[0]);
                }
              }}
            /> 
            <div className={emptyFields.includes('file') ? s.circleFrameError : s.circleFrame}>
              { (previewAvatar) ? (
                <>
                  <div className={s.previewCoverTransparent}> 
                    <img className={s.iconPhotoSmall} src={iconCameraWhite} /> 
                  </div>
                  <img className={s.previewAvatar} src={previewAvatar} /> 
                </>
              ) : (
                <>
                  <img className={s.iconPhoto} src={iconCamera} /> 
                  {/* <p className={s.fontBackgroundColor}>Załaduj zdjęcie</p>  */}
                  <p className={s.fontBackgroundColor}>Upload a photo 1:1</p> 
                </>
              )
              }
            </div>
          </label>
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '14.5rem',
              flexDirection: 'column', 
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'flex-end',
                marginBottom: '2rem',
              }}
            >   
              <ButtonNav 
                icon={saveIcon}
                onClick={handleSubmit}
                optionClass={'share'}
                optionLabel={'Save'}
              />
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'column',
                // justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >   
              <input 
                name={'id'}
                className={emptyFields.includes('id') ? s.nicknameInputError : s.nicknameInput}
                type='text' 
                placeholder='nickname_link'
                value={formData.id}
                onChange={handleChange}
              /> 
              <input 
                name={'name'} 
                className={emptyFields.includes('name') ? s.nameInputError : s.nameInput}
                type='text' 
                required
                placeholder='Name'
                value={formData.name.pl}
                onChange={handleChangePl}
              />     
            </div>
          </div>       
        </header>

        <div className={s.containerNumbers}>
          <div className={s.numberDiv}> 
            <div>
              {/* <p className={s.fontGold}>Jeden największy blog: </p> */}
              <p className={s.fontGold}>Your biggest blog: </p>
              <div className={s.selectSocial}>
                {
                  socialIcons.map((icon) => (
                    <label key={icon} htmlFor={icon}>
                      <input 
                        type="radio" 
                        id={icon}
                        name={'soc'}
                        value={icon} 
                        onChange={socialHandler} 
                        checked={icon === social}
                      />
                      <img 
                        className={s.socialIcon} 
                        src={
                          icon === social ? require(`../../../assets/svg/socIcon/${icon}.svg`) :
                            require(`../../../assets/svg/socIcon/unactive/${icon}.svg`)
                        }
                      />
                    </label>
                  ))
                }
              </div>
            </div>

            <div 
              style={{
                width: '100%', 
                gridRow: '1/5',
                gridColumn: '2/3',
              }}
            >
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                }}
              >
                <p className={s.fontGold}>Followers: </p>
                <div 
                  style={{
                    marginLeft: '1rem',
                    display: 'flex',
                  }}
                >
                  <SelectOption 
                    color={'#adb5bd'}
                    onChange={onChangeAudience}
                    options={audienceIcon}
                    selected={audienceCore}
                  />     
                  <span 
                    className={s.fontGold} 
                    style={{
                      display: 'inline-block',
                      // marginTop: '-1rem',
                      paddingLeft: '0.25rem'
                    }}
                  >{'<'}</span>
                </div>
              </div>
              <textarea 
                name={'description'} 
                rows={6} 
                placeholder='About you: '
                value={formData.description.pl}
                onChange={handleChangePl}
              /> 
            </div>

            <div>
              {/* <p className={s.fontGold}>Abonenci: </p> */}
              <input 
                name={'followers'} 
                className={s.followersInput}
                type='number' 
                placeholder='10,1'
                value={formData.mainBlog.followers === 0 ? '' : Number(formData.mainBlog.followers).toString()}
                onChange={handleChangeMainBlog}
              /> 
              <span className={s.followersK}>K</span>
            </div>

            
            <div>
              {/* <span className={s.numberGrey}>{(followers > 10) ? followers : '--'}</span> */}
            </div>
            <div>
              <input 
                name={'link'} 
                className={s.nicknameInput}
                type='text' 
                // placeholder={`${social}.com/`}
                placeholder='Your link:'
                value={formData.mainBlog.link}
                onChange={handleChangeMainBlog}
                style={{
                  marginBottom: '0',
                }}
              /> 
            </div>
            <div>
            </div>
          </div>  
        </div>
        <div
          style={{
            marginBottom: '1rem',
          }}
        ></div>
      </form>
    </>
  );
};

export default EditHeader;