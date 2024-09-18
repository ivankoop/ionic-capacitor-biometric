/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react';

import { Route, Redirect } from 'react-router';

interface ProtectedRouteProps {
    component: React.ComponentType<unknown>;
    path: string;
}

const ProtectedRoute = function ({ component: Component, path }: ProtectedRouteProps) {
  // TODO: change later
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return (
    <Route path={path}
      render={() => (isAuthenticated ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

export default ProtectedRoute;
