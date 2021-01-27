import React, { useState, useContext } from 'react';
import { SignUp, useFormState } from '../componentLibrary/login-signup';
import { Link as RouterLink } from 'react-router-dom';
import { CreateUser } from '../components-functions/APIFunctions';
import { UserContext } from '../context/UserContext';

const SignUpPage = () => {
  const { setUser } = useContext(UserContext);

  const formStates = useFormState();
  const { email, password } = formStates;

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');

  const linkText = 'Have an account? Login.';
  const linkTo = '/login';

  const fields = [
    {
      label: 'Name',
      state: name,
      setState: setName,
    },
    {
      label: 'Surname',
      state: surname,
      setState: setSurname,
    },
    {
      label: 'Address',
      state: address,
      setState: setAddress,
    },
  ];

  const HandleSignUp = async (event) => {
    event.preventDefault();
    if (formStates.Submit('signUp')) {
      //info is valid
      formStates.setBtnLoading(true);
      const response = await CreateUser(
        email,
        password,
        surname,
        address,
        name
      );
      console.log(response);
      if (response.status === 201) {
        setUser(response.data);
      } else {
        //fetch failed OR data is faulty
        alert(response.data.message);
      }
      formStates.setBtnLoading(false);
    } else {
      //textfields are not filled correctly, error messages handle this
    }
  };

  return (
    <SignUp
      fields={fields}
      formStates={formStates}
      handleSubmit={HandleSignUp}
      linkText={linkText}
      linkComponent={RouterLink}
      linkTo={linkTo}
    ></SignUp>
  );
};

export default SignUpPage;
