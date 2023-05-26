import React, { useEffect, useState } from 'react';
import EditHeader from '../components/BloggerCabinet/EditHeader/EditHeader';
import Container from '../components/Containers/Container/Container';
import imgHint1 from '../assets/mockups/hint-screen-1.png';

import { BloggerBigType } from '../types/test.types';
import ContainerHint from '../components/BloggerCabinet/ContainerHint/ContainerHint';

export interface bloggerDataType {
  avatar: string;
  id: string;
  name: {
    pl: string;
  };
  mainBlog: {
    soc: string;
    followers: number | string;
    link: string;
  };
  description: {
    pl: string;
  };
}

export const bloggerInitialState = {
  avatar: '',
  id: '',
  name: {
    en: '',
    pl: '',
    or: '',
    ua: '',
  },
  mainBlog: {
    soc: '',
    followers: 0,
    link: '',
    en: '',
    pl: '',
    or: '',
    ua: '',
  },
  audience: [''],
  description: {
    en: '',
    pl: '',
    or: '',
    ua: '',
  },
  topics: {
    en: '',
    pl: '',
    or: '',
    ua: '',
  },
  followers: 0,
  passedTests: 0,
};

const BloggerCreatePage = () => {
  const [formData, setFormData] = useState<BloggerBigType>(bloggerInitialState);
  const [blogger, setBlogger] = useState<any | undefined>(undefined);
  const [createTest, setCreateTest] = useState<boolean>(false);
  const [createGame, setCreateGame] = useState<boolean>(false);

  useEffect(() => {
    setBlogger({
      id: formData.id,
      avatar: formData.avatar,
      name: {
        pl: formData.name.pl,
        ua: '',
        or: '',
      },
    });
  }, [formData]);

  return (
    <Container
      justifyContent="flex-start"
      backgroundColor="#212529"
      locked={false}
    >
      <div style={{ marginTop: '3rem' }} />
      <EditHeader formData={formData} setFormData={setFormData} />
      <ContainerHint
        img={imgHint1}
        textHint={'Your profile is going to look like ⤵️'}
      />
    </Container>
  );
};

export default BloggerCreatePage;
