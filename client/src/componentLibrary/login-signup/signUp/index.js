import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Avatar,
  CircularProgress,
  Link,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '3rem',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  linkText: {
    color: theme.palette.info.light,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp({
  formStates,
  fields,
  handleSubmit,
  maxWidth,
  linkText,
  linkComponent,
  linkTo,
  children,
}) {
  const classes = useStyles();

  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errEmail,
    errPassword,
    errConfirmPassword,
    btnLoading,
  } = formStates;

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <Container maxWidth={maxWidth || 'xs'}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography variant="h5">Sign Up</Typography>
        <form className={classes.form}>
          <TextField
            error={errEmail ? true : false}
            helperText={errEmail}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></TextField>
          <TextField
            error={errPassword ? true : false}
            helperText={errPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  >
                    {passwordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            error={errConfirmPassword ? true : false}
            helperText={errConfirmPassword}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type={passwordVisible ? 'text' : 'password'}
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setPasswordVisible(!passwordVisible);
                    }}
                  >
                    {passwordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          {fields &&
            fields.map((field, i) => (
              <TextField
                key={i}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name={field.label}
                label={field.label}
                type="text"
                id={field.label}
                error={!field.state}
                value={field.state}
                onChange={(e) => {
                  field.setState(e.target.value);
                }}
              ></TextField>
            ))}
          {children}
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            onClick={(e) => {
              handleSubmit(e);
            }}
            disabled={btnLoading}
          >
            {btnLoading ? <CircularProgress size={25} /> : 'Sign Up'}
          </Button>
        </form>
        <Link
          component={linkComponent}
          to={linkTo || ''}
          className={classes.linkText}
        >
          {linkText || ''}
        </Link>
      </Paper>
    </Container>
  );
}

export default SignUp;
