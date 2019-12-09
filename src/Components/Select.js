import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2, 0),
    minWidth: 251,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NativeSelects(props) {
const classes = useStyles();

 const options = props.categories.map(item => {
     return <option value={item} key={item}>{item}</option>
 })
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Wybierz kategorię</InputLabel>
        <Select
          native
          value={props.optionCategory}
          onChange={props.handleChange}
          inputProps={{
            name: 'age',
            id: 'age-native-simple',
          }}
        >
        <option value={props.optionCategory}>{props.optionCategory}</option>
        {options}
        </Select>
      </FormControl>
    </div>
  );
}