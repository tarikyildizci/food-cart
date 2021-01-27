import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <>{user ? <Route {...rest}>{children}</Route> : <Redirect to="/login" />}</>
  );
};

export default PrivateRoute;

//Redirect if not user
