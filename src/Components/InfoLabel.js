import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(theme => ({
  root: {
    width: '250px',
    marginBottom: '30px',
    backgroundColor: '#3f51b5',
    color: 'white'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: 'white',
    color: '#3f51b5',
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  }
}));

const InfoLabel = props => {

  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              {props.name}
            </Typography>
            <Typography
              color="inherit"
              variant="h4"
            >
              {props.value.toFixed(2)} zł
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

InfoLabel.propTypes = {
  className: PropTypes.string
};

export default InfoLabel;
