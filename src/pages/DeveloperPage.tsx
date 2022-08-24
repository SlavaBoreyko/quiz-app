import React from 'react'
import Container from '../components/Containers/Container/Container'
import DevProfileHeader from '../components/Profile/ProfileHeader/DevProfileHeader/DevProfileHeader'
import ProfileHeader from '../components/Profile/ProfileHeader/ProfileHeader'

const DeveloperPage = () => {
  return (
    <Container
        justifyContent='flex-start'
        backgroundColor='#212529'
        locked={false}
    >
         <DevProfileHeader 
                    photoUrl={'https://firebasestorage.googleapis.com/v0/b/mens-test-app.appspot.com/o/developers%2Favatar-slava-dev.jpg?alt=media&token=21409903-36d7-4191-a816-814aee70f8c1'} 
                    name={'Ярослав'} 
                    story={
                        <>
                        <p>Автор і розробник.</p>
                        {/* <p>Адепт Дівертіто.</p> */}
                        <span>ДЛЯ БЛОГЕРІВ</span> <p>Хочеш запустити свої фанові тести з платною підпискою? Пиши мені.</p>
                        <span>ДЛЯ ПРОГЕРІВ</span> <p>Ти фронтендщик на React, бекендщик Node.js/Nest.js чи девопс і хочеш долучитись за гроші чи за ідею)). Пиши.</p>
                        <span>ДЛЯ ЮЗЕРІВ</span> <p>Є пропозиції, фідбек - пиши.</p>
                        </>
                    }
                    instagram={'https://instagram.com/jaroslaw.dev'}
                    telegram={'https://t.me/slvcrpt'}
        />
    </Container> 
  )
}

export default DeveloperPage