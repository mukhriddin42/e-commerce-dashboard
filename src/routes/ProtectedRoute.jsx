import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');

  

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
