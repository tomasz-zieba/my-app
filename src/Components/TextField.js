import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    width: 251,
  },
}));

export default function StandardTextField(props) {
  const classes = useStyles();

  return (
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <TextField
          type={props.type}
          className={classes.textField}
          label={props.label}
          value={props.value}
          margin="normal"
          onChange={(event) => props.changed(event)}
        />
      </div>
  );
}