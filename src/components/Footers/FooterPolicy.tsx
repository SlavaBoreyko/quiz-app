import { FC } from "react";

export interface FooterPolicyProps {
    language: string | null;
}

const FooterPolicy: FC<FooterPolicyProps> = ({
  language
}) => (
  <div 
    style={{
      color: '#adb5bdaa',
      fontSize: '1.2rem',
      marginTop: '1rem',
      alignSelf: 'flex-end',
    }}
  >
    {(language === 'ua') ? 
      // <> 
      //       *Пользуясь сайтом, вы принимаете правила
      //   <a  href={require('../../assets/pdf/privacy-policy.pdf')} target='_blank'
      //     style={{
      //       color: '#adb5bdd2',
      //     }}
      //   > Политики конфиденциальности.</a>
      // </> :
      (<>
        <span> *Користуючись сайтом, ви приймаєте правила</span>
        <a href={require('../../assets/pdf/privacy-policy.pdf')} target='blank'
          style={{
            color: '#adb5bdd2',
          }}
        > Політики конфіденційності.</a>
      </>
      ) : (
        <>
        <span> *Korzystając z serwisu akceptujesz zasady</span>
        <a href={require('../../assets/pdf/privacy-policy.pdf')} target='blank'
          style={{
            color: '#adb5bdd2',
          }}
        > Polityki Prywatności.</a>
      </>
      )
    }
  </div>
);

export default FooterPolicy;