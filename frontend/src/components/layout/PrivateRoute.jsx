import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ component: Component }) => {
  const { user } = useAuth();
  return user ? <Component /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
