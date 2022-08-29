import { Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

const AuthWrapper = () => {
  useAuthStatus();

  return <Outlet />;
};

export default AuthWrapper;
