import { useState } from 'react';

export const useSticker = () => {
  const [show, setShow] = useState<boolean>(false);
  const [img, setImg] = useState<string>('');

  return {
    img,
    setImg,
    show,
    setShow,
  };
};
