import { Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  header: {
    width: '100%',
    fontFamily: "'Modak', cursive",
    color: theme.palette.secondary.main,
  },
}));

const JumbotronHeader = ({ text }) => {
  const classes = useStyles();

  return (
    <div>
      <Toolbar>
        <Typography className={classes.header} align="center" variant="h1">
          {text}
        </Typography>
      </Toolbar>
    </div>
  );
};

export default JumbotronHeader;
