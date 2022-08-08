import React from 'react';
import s from './TestHeader.module.scss';
import avatar from '../../../assets/test-images/max-avatar.jpeg'

const TestHeader = () => {
  return (
    <div className={s.divHeader}>
        <img className={s.avatarHeader} src={avatar} alt={'Avatar'}/>
        <div className={s.divText}>
            <span className={s.bloggerName}>Максим Дівертіто</span>
            <span className={s.testName}>Коли дівчина у тебе вдома</span>
        </div>

    </div>
    
  )
}

export default TestHeader