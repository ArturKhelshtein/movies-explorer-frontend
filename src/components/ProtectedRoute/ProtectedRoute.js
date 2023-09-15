import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLogged, element: Component, ...props }) => {
  console.log(isLogged)
  return isLogged ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
