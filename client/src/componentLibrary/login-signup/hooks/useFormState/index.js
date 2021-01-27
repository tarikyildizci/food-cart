import { useState } from 'react';

const useFormState = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPassword, setErrPassword] = useState('');
  const [errConfirmPassword, setErrConfirmPassword] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const Validate = (type) => {
    let isInfoValid = true;
    if (!validateEmail(email)) {
      setErrEmail('Email is not valid.');
      isInfoValid = false;
    }
    if (email === '') {
      setErrEmail('This field is required.');
      isInfoValid = false;
    }
    if (password.length < 6 || password.length > 30) {
      setErrPassword('Password length should be between 6 - 30 characters.');
      isInfoValid = false;
    }
    if (password === '') {
      setErrPassword('This field is required.');
      isInfoValid = false;
    }
    if (type === 'signUp' && confirmPassword !== password) {
      setErrConfirmPassword('Passwords do not match.');
      isInfoValid = false;
    }
    return isInfoValid;
  };

  const ClearErrors = () => {
    setErrEmail('');
    setErrPassword('');
  };

  const ClearFields = () => {
    setEmail('');
    setPassword('');
  };

  const Submit = (type) => {
    ClearErrors();
    return Validate(type);
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errEmail,
    setErrEmail,
    errPassword,
    setErrPassword,
    errConfirmPassword,
    setErrConfirmPassword,
    btnLoading,
    setBtnLoading,
    ClearFields,
    ClearErrors,
    Submit,
  };
};
export default useFormState;
