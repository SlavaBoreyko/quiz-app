import React, { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';
import s from './SubcriptionCard.module.scss';
import ButtonPrice from '../../../Buttons/ButtonPrice/ButtonPrice';
import lockIcon from '../../../../assets/svg/ui/lock.svg';
import giftIcon from '../../../../assets/svg/ui/giftbox2.svg';
import HtmlParser from 'html-react-parser'; 

export interface SubcriptionCardProps {
  onClick: any; 
  option: 'subscription' | 'donation';

  footerText: string;

  price: string;
  // onClick: MouseEventHandler<HTMLDivElement> | undefined; 
}

const SubcriptionCard: FC<SubcriptionCardProps> = ({
  onClick,
  option,

  footerText,
  price,
}) => {
  const [classNameOption, setClassNameOption] = useState<any | undefined>(undefined);
  const [srcIcon, setSrcIcon] = useState<string | undefined>(undefined);
  const [labelMap, setLabelMap] = useState<any | undefined>(undefined);

  useEffect(() => {
    switch(option) {
    case 'donation':
      setClassNameOption(s.iconGift);
      setSrcIcon(giftIcon);
      setLabelMap({ua: 'Донат', or: 'Донат'});
      break;
    case 'subscription':
      setClassNameOption(s.icon);
      setSrcIcon(lockIcon);
      setLabelMap({ua: 'Закритий доступ', or: 'Закритый доступ'});
      break;
    }
    // Place for other monetization option 
  }, [option]);

  return (
    <>
      {
        <div className={s.testCardContainter} onClick={onClick}>
          {/* COVER */}
          <div className={s.coverFrame}>
            <div className={s.iconDiv}>
              <img className={classNameOption} src={srcIcon} />
            </div>
            <p>{labelMap && labelMap.ua}</p>
          </div>
          <div className={s.divPaddingContainer}>
            <div className={s.textDiv}>
              {/* DESCRIPTION */}
              <div className={s.divResult}>
                <div>
                  {HtmlParser(footerText)}
                </div>
                {/* Radius 24% must be equal to other circle elements for Balance */}
                <ButtonPrice price={price} onClick={onClick}/>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
export default SubcriptionCard;