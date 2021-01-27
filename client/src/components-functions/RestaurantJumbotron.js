import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: "url('https://source.unsplash.com/8rEJiVQk1Vw')",
    objectFit: 'contain',
    minHeight: 250,
    maxWidth: 900,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: '1rem',
  },
  header: {
    fontFamily: "'Modak', cursive",
    color: theme.palette.secondary.main,
  },
  slogan: {
    fontFamily: "'Playball', cursive",
    color: theme.palette.secondary.dark,
  },
}));

const RestaurantJumbotron = ({ name, slogan, mobile }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant={mobile ? 'h2' : 'h1'} className={classes.header}>
        {name}
      </Typography>
      <Typography className={classes.slogan} variant={mobile ? 'h5' : 'h4'}>
        {slogan}
      </Typography>
    </Paper>
  );
};

export default RestaurantJumbotron;
