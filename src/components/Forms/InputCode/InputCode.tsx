import React, { useState, useRef,useEffect,  FC } from "react";
import s from './InputCode.module.scss';
import lockIcon from '../../../assets/svg/ui/lock-grey.svg';
import unlockIcon from '../../../assets/svg/ui/unlock-grey.svg';

export interface InputCodeProps {
    length: number;
    label: string;
    loading: boolean;
    onComplete: any;
    isValid: boolean | undefined;
    setIsValid: any;
}

const InputCode:FC<InputCodeProps> = ({ 
  length, 
  label, 
  loading, 
  onComplete,
  isValid,
  setIsValid,
}) => {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const refInputs = useRef<(HTMLInputElement | null)[]>([]);

  const processInput = (e: any, slot:any) => {
    const num = e.target.value;
    // if (/[^0-9]/.test(num)) return;
    
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      (refInputs.current[slot + 1]) && refInputs.current[slot + 1]!.focus();
    }
    if (newCode.every(num => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onKeyUp = (e: any, slot:any) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setIsValid(undefined);
      setCode(newCode);
      (refInputs.current[slot - 1]) && refInputs.current[slot - 1]!.focus();
    }
  };

  const codeInputsClass = (isValid === false) ? s.codeInputsInvalid : 
    (isValid === true) ? s.codeInputsValid : 
      s.codeInputs;
  const codeIconClass = `${s.codeLockIcon} ${isValid === false ? s.invalid : 
    isValid === true ? s.valid : '' }`;
  const iconSrc = (isValid === true) ? unlockIcon : lockIcon;

  return (
    <div className={s.codeInput}>
      <label className={s.codeLabel}>{label}</label>
      <div className={codeInputsClass}>
        <div className={codeIconClass}>
          <img className={s.icon} src={iconSrc} />
        </div>
        {code.map((num, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={num}
            autoFocus={!code[0].length && idx === 0}
            readOnly={loading}
            onChange={e => processInput(e, idx)}
            onKeyUp={e => onKeyUp(e, idx)}
            ref={ref => refInputs.current.push(ref)}
          />
        ))}
      </div>
    </div>
  );
};

export default InputCode;
