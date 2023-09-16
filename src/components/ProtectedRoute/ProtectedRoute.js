import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  isTokenChecked,
  checkToken,
  isLogged,
  element: Component,
  ...props
}) => {
  React.useEffect(() => {
    if (!isTokenChecked) {
      checkToken();
    }
  }, [isTokenChecked]);

  if (!isTokenChecked) {
    return null;
  }

  return isTokenChecked ? (
    isLogged ? (
      <Component {...props} />
    ) : (
      <Navigate to="/" replace />
    )
  ) : null;
};

export default ProtectedRoute;
