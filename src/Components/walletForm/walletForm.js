import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import DatePicker from'../DatePicker';
import StandardTextField from '../TextField';
import Select from '../Select';
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

function Expanditure (props) {

    const [value, setValue] = useState('')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [date, seteDate] = useState(new Date());
    const [category, setCategory] = useState('');

    const dispatch = useDispatch();
    const onInfoELementOpen = (type, message) => dispatch(actions.onInfoELementOpen(type, message));

    const walletStartDate = useSelector(state => { return state.wallet.startDate });
    const walletEndDate = useSelector(state => { return state.wallet.endDate });

    const useStyles = makeStyles(theme => ({
        root: {
          ...theme.typography.button,
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(1),
          textAlign: 'center',
          fontWeight: 700,
          color: theme.palette.primary.dark,
          borderBottom: 'solid 1px',
          borderColor: theme.palette.primary.dark,
          marginBottom: '30px'
        },
      }));

    const classes = useStyles();

    const handleDateChange = date => {
        seteDate(date);
    };

    const valueChangeHandler = event => {
        setValue(event.target.value);
    }
    const inputChangeHandler = event => {
        setAdditionalInfo(event.target.value);
    } 
    const OptionHandleChange = event => {
        setCategory(event.target.value);
    }

    const clickHandler = () => {
        if(isNaN(date.getTime())) {
            onInfoELementOpen('error', "Podaj prawidłową datę.")
            return false;
        }
        if( value === '' ) {
            onInfoELementOpen('error', "Podaj kwotę transakcji.")
            return false;
        }
        if( category === '' ) {
            onInfoELementOpen('error', "Podaj kategorię transakcji.")
            return false;
        }
        if(!(new Date(walletStartDate).setHours(0,0,0,0) <= new Date(date).setHours(0,0,0,0) && new Date(walletEndDate).setHours(0,0,0,0) >= new Date(date).setHours(0,0,0,0))) {
            onInfoELementOpen('error', "Data transakcji nie znajduje się w dacie ważności portfela.")
            return false;
        }
        
        const dateWithFormat = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();
        let fetchData = {
            key: props.walletKey,
            date: dateWithFormat,
            value: value,
            info: additionalInfo,
            category: category
        }
        props.clickHandler(fetchData);
        setValue('');
        setAdditionalInfo('');
        seteDate(new Date());
        setCategory('');
    }

    return (
        <div style={{width: '251px'}}>
            <div className={classes.root}>{props.label}</div>
            <DatePicker label={props.dateLabel} date={date} onDateChange={handleDateChange}/>
            <StandardTextField 
                label="Kwota"
                type="number"
                value={value}
                changed={valueChangeHandler}/>
            <StandardTextField 
                label="Dodatkowe informacje" 
                value={additionalInfo}
                changed={inputChangeHandler}/>
            <Select 
                categories={props.categories} 
                optionCategory={category}
                handleChange={OptionHandleChange}/>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <Button 
                onClick={clickHandler}
                disabled={props.active} 
                style={{width: '251px', marginTop: '30px'}} 
                variant="contained" 
                size="large" 
                color="primary" 
                className={classes.margin}
                >Wyślij</Button>
            </div>
        </div>
    );
};

export default Expanditure;