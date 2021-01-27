import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  rootMobile: {
    maxWidth: 160,
  },
  media: {
    height: 320,
  },
  mediaMobile: {
    height: 100,
  },
  header: {
    fontFamily: "'Playball', cursive",
    color: theme.palette.primary.light,
  },
}));

export default function ProductCard({ header, image, children }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={header} />
        <CardContent>
          <Typography className={classes.header} gutterBottom variant="h4">
            {header}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
          {children}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function MobileProductCard({ header, image, children }) {
  const classes = useStyles();

  return (
    <Card className={classes.rootMobile}>
      <CardActionArea>
        <CardMedia
          className={classes.mediaMobile}
          image={image}
          title={header}
        />
        <CardContent>
          <Typography className={classes.header} gutterBottom variant="h6">
            {header}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
          {children}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
