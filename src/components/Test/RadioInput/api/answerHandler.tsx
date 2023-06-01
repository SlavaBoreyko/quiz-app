import React, { Dispatch, SetStateAction } from 'react';

export const answerHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  setChecked: Dispatch<SetStateAction<boolean[]>>,
  setValue: Dispatch<SetStateAction<number>>,
  reaction?: string,
  setReactionSrc?: Dispatch<SetStateAction<string>>,
) => {
  if (e.target.checked) {
    e.preventDefault();
    setValue(+e.currentTarget.value);

    // restart checked inputs
    let newChecked = [false, false, false];
    newChecked[+e.target.id] = true;
    setChecked(newChecked);

    // STICKER
    if (reaction && setReactionSrc) {
      setReactionSrc(reaction);
    }
  }
};
