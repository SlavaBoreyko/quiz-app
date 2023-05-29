import React, { useEffect, useRef } from 'react';
import s from './TestCardCoverImg.module.scss';

export const TestCardCoverImg = ({ img }: { img: string }) => {
  const refImg = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (refImg.current) {
      refImg.current.style.backgroundImage = `url("${img}")`;
    }
  }, [refImg.current]);
  return (
    <div className={s.coverFrame}>
      <div ref={refImg} className={s.coverOpen} />
    </div>
  );
};
