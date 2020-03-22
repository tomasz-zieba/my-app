import React from 'react';
import useStyles from '../../Style';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import {CardHeader} from '@material-ui/core';

function CategoriesList (props) {
    const classes = useStyles();
    return (
    <List className={classes.rootWrap}>
        <CardHeader title={props.label} />
        {props.list.map(value => {
        const labelId = `checkbox-list-label-${value.key}`;
        return (
            <ListItem key={value.key} role={undefined} dense button onClick={props.onClick(value.name)}>
                <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={props.checked.includes(value.name)}
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
            onClick={props.removeClick}
            // disabled={props.active} 
            style={{width: '300px', marginTop: '30px'}} 
            variant="contained" 
            size="large" 
            color="primary" 
            className={classes.margin}
            >Usuń zaznaczone kategorie</Button> 
    </List>
    )
}

export default CategoriesList;