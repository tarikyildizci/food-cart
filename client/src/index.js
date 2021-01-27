import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import UserProvider from './context/UserContext';
import CartProvider from './context/CartContext';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#f57c00',
      light: '#ffad42',
      dark: '#bb4d00',
    },
    secondary: {
      main: '#b71c1c',
      light: '#f05545',
      dark: '#7f0000',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <UserProvider>
        <CartProvider>
          <CssBaseline />
          <App />
        </CartProvider>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
