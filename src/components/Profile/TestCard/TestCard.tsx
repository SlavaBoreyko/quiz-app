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

import { BloggerShortType } from '../../../types/blogger.types';
import { TestCardHeader } from './TestCardHeader/TestCardHeader';

export interface TestCardProps {
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  cover: string;
  blogger: BloggerShortType;
  // Title
  testName: string;
  //Footer and button
  footerText?: any;

  price?: number;
  button?: any;
}

const TestCard: FC<TestCardProps> = ({
  onClick,
  cover,

  blogger,

  testName,
  footerText,
  price,
  button,
}) => {
  const navigate = useNavigate();
  const refImg = useRef<HTMLDivElement>(null);
  const [openEditCard, setOpenEditCard] = useState<boolean>(false);

  useEffect(() => {
    if (refImg.current) {
      refImg.current.style.backgroundImage = `url("${cover}")`;
    }
  }, [refImg.current]);

  return (
    <>
      <div className={s.testCardContainter} onClick={onClick}>
        {/* COVER */}
        <div className={s.coverFrame}>
          <div ref={refImg} className={s.coverOpen} />
        </div>
        <div className={s.divPaddingContainer}>
          <div className={s.textDiv}>
            <div className={s.centerTitle}>
              <TestCardHeader blogger={blogger} />
              <div className={s.titleTest}>
                <p>{testName}</p>
              </div>
            </div>

            {/* FOOTER */}
            <div className={s.divResult}>
              <span className={s.status}>{footerText}</span>
              <div className={s.priceNumber}>{price}</div>
              {/* Radius 24% must be equal to other circle elements for Balance */}
              {button}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestCard;
