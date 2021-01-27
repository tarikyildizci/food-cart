import React, { useContext } from 'react';

import { Login, useFormState } from '../componentLibrary/login-signup';
import { Link as RouterLink } from 'react-router-dom';

import { UserLogin } from '../components-functions/APIFunctions';
import { UserContext } from '../context/UserContext';

import Container from '@material-ui/core/Container';

const LoginPage = () => {
  const { setUser } = useContext(UserContext);

  const formStates = useFormState();

  const linkText = "Don't have an account? Sign Up.";
  const linkTo = '/signup';

  const HandleLogin = async (event) => {
    event.preventDefault();
    if (formStates.Submit()) {
      //the input fields are validated
      //sending email and password to server
      formStates.setBtnLoading(true); //Change button to loading

      const response = await UserLogin(formStates.email, formStates.password); //api call

      formStates.setBtnLoading(false);

      if (response.status === 200) {
        //fetch successful & data is OK
        setUser(response.data);
      } else {
        //fetch failed OR data is faulty
        alert(response.data.message);
      }
    } else {
      //Inputs are not OK
    }
  };

  return (
    <Container maxWidth="sm">
      <p>
        You can use <strong>tarik@tarik.com</strong> as username and
        <strong> 123456</strong> as password <br /> Logging in may take 10 to 20
        seconds due to free hosting service's poor speed
      </p>
      <Login
        formStates={formStates}
        handleSubmit={HandleLogin}
        linkComponent={RouterLink}
        linkText={linkText}
        linkTo={linkTo}
      />
    </Container>
  );
};

export default LoginPage;
