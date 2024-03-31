import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const AuthChecker = () => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default AuthChecker;