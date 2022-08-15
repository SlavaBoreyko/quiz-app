import s from './TestHeader.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFetchTestQuery } from '../../../features/test/testApi';
import BtnRectangle from '../../Profile/BtnRectangle/BtnRectangle';

const TestHeader = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: testData, isLoading, isError, error }  = useFetchTestQuery(params.id!);

  return (
    <>
    {
      (testData) && (
        <>
          <Link to='/'>
            <div className={s.divHeader}>
                <img className={s.avatarHeader} src={testData.blogger.avatar} alt={'Avatar'}/>
                <div className={s.divText}>
                    <span className={s.bloggerName}>{testData.blogger.name}</span>
                    <span className={s.testName}>{testData.testName}</span>
                </div>
      
            </div>
          </Link>  
          {/* AFTER Max video release */}
          {/* <div 
            style={{
              marginTop: '0.5rem',
            }}
          >
            <BtnRectangle caption={`> Розробник`} onClick={() => navigate('/developer')} />
          </div> */}
        </>
      )
    }
    </>
  )
}

export default TestHeader