import React, { Dispatch, FC, SetStateAction } from 'react'
import s from './RadioInput.module.scss';

export interface RadioInputProps {
  text: any;
  index: number;
  value: any;
  setValue: Dispatch<SetStateAction<number>>;
  checked: boolean[];
  setChecked: Dispatch<SetStateAction<boolean[]>>;
  indicatedAnswer?: number;
  trueAnswer?: number;

  reaction?: string;
  setReactionSrc?: Dispatch<SetStateAction<string>>;

  
}

const RadioInput: FC<RadioInputProps> = ({
  text, value, index, setValue, 
  checked, setChecked,
  reaction, setReactionSrc,
  indicatedAnswer, trueAnswer
}) => {

  const answerHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // BLOCKED radioinputs AFTER FIRST PRESS 'true' checked
    if (checked.includes(true)) return ;
    
    if (e.target.checked) {
      e.preventDefault();
      setValue(+e.currentTarget.value);
      // DEBUG
      console.log('value', value);
      console.log('e.currentTarget.value', +e.currentTarget.value);

      // restart checked inputs 
      let newChecked = [false, false, false];
      newChecked[+e.target.id] = true;
      setChecked(newChecked);

      // STICKER
      if (reaction && setReactionSrc) {
        setReactionSrc(reaction);
      }
    }
  } 

  return (
    <div className={s.radioContainer}>
      <label htmlFor={`${index}`} >
        <input 
          className={s.textContainer}
            type="radio" 
            id={`${index}`}
            name="select" 
            value={value} 
            onChange={answerHandler} 
            checked={checked[+index]}
          />
        { (indicatedAnswer === undefined || trueAnswer === undefined) && (
            <div className={checked[+index] ? s.textContainerChecked : s.textContainer }> 
                <span>{text}</span>
            </div>
          )
        }
        
        {(indicatedAnswer !== undefined && trueAnswer !== undefined) && (
            <div className={((value === trueAnswer)) ? s.textContainerTrue : (value === indicatedAnswer) ? s.textContainerFalse : s.textContainer }> 
              <span>{text}</span>
            </div>
          )
        }

      </label>
    </div>
  )
}

export default RadioInput;
