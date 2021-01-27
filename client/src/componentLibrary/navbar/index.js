import { AppBar, Toolbar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { SearchbarWithOptions } from '../search';

const useStyles = makeStyles(() => ({
  toolbar: {
    height: 80,
  },
}));

export const Navbar = ({
  LogoComponent,
  RightComponent,
  withSearch,
  options,
  value,
  setValue,
}) => {
  const classes = useStyles();
  return (
    <AppBar color="secondary" position="sticky">
      <Toolbar className={classes.toolbar}>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            {LogoComponent}
          </Grid>
          <Grid item xs={3}>
            {withSearch ? (
              <SearchbarWithOptions
                options={options}
                value={value}
                setValue={setValue}
              />
            ) : (
              ''
            )}
          </Grid>

          <Grid item xs={5} align="end">
            {RightComponent}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
