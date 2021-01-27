import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '450px',
    maxWidth: '912px',
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  rootMobile: {
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
    maxWidth: '912px',
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '2rem',
    justifyContent: 'center',
  },
  detailsMobile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    fontFamily: "'Modak', cursive",
  },
  subtitle: {
    fontFamily: "'Playball', cursive",
    marginBottom: '1rem',
  },
  cover: {
    width: '50%',
  },
  coverMobile: {
    width: '100%',
    height: '100%',
  },
}));

export default function HeroCard({
  headerTextOne,
  headerTextTwo,
  itemName,
  buttonText,
  image,
  OnClick,
}) {
  const classes = useStyles();

  const [isRaised, setIsRaised] = useState(false);
  return (
    <>
      <Hidden xsDown>
        <Card
          className={classes.root}
          onMouseOver={() => {
            setIsRaised(true);
          }}
          onMouseOut={() => {
            setIsRaised(false);
          }}
          raised={isRaised}
          onClick={OnClick || null}
        >
          <CardMedia
            className={classes.cover}
            image={image}
            title="hero-image"
          />
          <div className={classes.details}>
            <CardContent>
              <Typography className={classes.header} variant="h1">
                {headerTextOne}
              </Typography>
              <Typography className={classes.header} variant="h1">
                {headerTextTwo}
              </Typography>
              <Typography className={classes.subtitle} variant="h4">
                {itemName}
              </Typography>
              <Button variant="contained" color="secondary">
                {buttonText}
              </Button>
            </CardContent>
          </div>
        </Card>
      </Hidden>
      <Hidden smUp>
        <Card
          className={classes.rootMobile}
          onMouseOver={() => {
            setIsRaised(true);
          }}
          onMouseOut={() => {
            setIsRaised(false);
          }}
          raised={isRaised}
          onClick={OnClick || null}
        >
          <CardMedia
            className={classes.coverMobile}
            image={image}
            title="hero-image"
          />
          <div className={classes.detailsMobile}>
            <CardContent>
              <Typography className={classes.header} variant="h2">
                {`${headerTextOne} ${headerTextTwo}`}
              </Typography>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography className={classes.subtitle} variant="h5">
                    {itemName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary">
                    {buttonText}
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </div>
        </Card>
      </Hidden>
    </>
  );
}
