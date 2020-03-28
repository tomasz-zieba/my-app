import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
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

export default function StandardTextField({
  label, value, changed, type,
}) {
  const classes = useStyles();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <TextField
        type={type}
        className={classes.textField}
        label={label}
        value={value}
        margin="normal"
        onChange={(event) => changed(event)}
      />
    </div>
  );
}

StandardTextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  changed: PropTypes.func.isRequired,
};
