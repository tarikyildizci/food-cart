import React from 'react';

import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { PrivateRoute, NoUserRoute } from './custom-routes';

import { SnackbarProvider } from 'notistack';

import { LoginPage, SignUpPage, Home, Restaurant, Cart } from './pages';

function App() {
  return (
    <Router>
      <Switch>
        <NoUserRoute exact path="/login">
          <LoginPage />
        </NoUserRoute>
        <NoUserRoute exact path="/signup">
          <SignUpPage />
        </NoUserRoute>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <PrivateRoute exact path="/cart">
          <SnackbarProvider>
            <Cart />
          </SnackbarProvider>
        </PrivateRoute>
        <PrivateRoute exact path="/:restaurant">
          <SnackbarProvider>
            <Restaurant />
          </SnackbarProvider>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
