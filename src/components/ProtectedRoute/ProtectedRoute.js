import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, element: Component, ...props }) => {
  return isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/signup" replace />
  );
};

export default ProtectedRoute;
