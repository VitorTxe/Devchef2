import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('userToken');

  if (!token) {
    // Se não houver token, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;