import s from './TestHeader.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useFetchTestQuery } from '../../../features/test/testApi';

const TestHeader = () => {
  const params = useParams();
  const { data: testData, isLoading, isError, error }  = useFetchTestQuery(params.id!);

  return (
    <Link to='/'>
      <div className={s.divHeader}>
          <img className={s.avatarHeader} src={testData.blogger.avatar} alt={'Avatar'}/>
          <div className={s.divText}>
              <span className={s.bloggerName}>{testData.blogger.name}</span>
              <span className={s.testName}>{testData.testName}</span>
          </div>

      </div>
    </Link>  
  )
}

export default TestHeader