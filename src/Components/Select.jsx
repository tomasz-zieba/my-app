import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2, 0),
    minWidth: 251,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects({ categories, optionCategory, handleChange }) {
  const classes = useStyles();
  const options = categories.map((item) => <option value={item} key={item}>{item}</option>);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Wybierz kategorię</InputLabel>
        <Select
          native
          value={optionCategory}
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
          <option value={optionCategory}>
            {optionCategory}
          </option>
          {options}
        </Select>
      </FormControl>
    </div>
  );
}

NativeSelects.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  optionCategory: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
