import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const NoUserRoute = ({ children, ...rest }) => {
  const { user } = useContext(UserContext);
  return (
    <> {user ? <Redirect to="/" /> : <Route {...rest}>{children}</Route>}</>
  );
};

export default NoUserRoute;

//Users cannot use these routes(Signup,Login)
