import React from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { CardHeader } from '@material-ui/core';

import useStyles from '../../Style';

function CategoriesList({
  list, checked, removeClick, onClick, label,
}) {
  const classes = useStyles();
  return (
    <List className={classes.rootWrap}>
      <CardHeader title={label} />
      {list.map((value) => {
        const labelId = `checkbox-list-label-${value.key}`;
        return (
          <ListItem key={value.key} role={undefined} dense button onClick={onClick(value.name)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.includes(value.name)}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={value.name} />
          </ListItem>
        );
      })}
      <Button
        onClick={removeClick}
        style={{ width: '300px', marginTop: '30px' }}
        variant="contained"
        size="large"
        color="primary"
        className={classes.margin}
      >
        Usuń zaznaczone kategorie
      </Button>
    </List>
  );
}

export default CategoriesList;

CategoriesList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  checked: PropTypes.arrayOf(PropTypes.string).isRequired,
  removeClick: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
