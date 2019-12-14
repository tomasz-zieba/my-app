import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../Style';
import * as actions from '../../store/actions/index';
import DatePicker from '../../Components/DatePicker';
import StandardTextField from '../../Components/TextField';
import Snackbars from '../../Components/SnackBar';
import Button from '@material-ui/core/Button';


function WelcomPage (props) {
    
    const [walletName, setWalletName] = useState('')
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const classes = useStyles();


    const dispatch = useDispatch();
    const onInfoELementClose = (event, reason) => dispatch(actions.onInfoELementClose(event, reason));
    const onFetchNewWallet = (walletData) => dispatch(actions.onFetchNewWallet(walletData));

    const infoElementOpen = useSelector(state => { return state.settings.infoElementOpen });
    const infoElementText = useSelector(state => { return state.settings.infoElementText });
    const infoElementVariant = useSelector(state => { return state.settings.infoElementVariant });
    
    const handleStartDateChange = date => {
      setStartDate(date);
    };
    const handleEndDateChange = date => {
      setEndDate(date);
    };

    function inputChangeHandler (event) {
      setWalletName(event.target.value);
    }
    function sendAction() {
      const startDateWithFormat = startDate.getDate().toString() + '.' + (startDate.getMonth() + 1).toString() + '.' + startDate.getFullYear().toString()
      const endDateWithFormat = endDate.getDate().toString() + '.' + (endDate.getMonth() + 1).toString() + '.' + endDate.getFullYear().toString()
      const walletData = {
        walletName: walletName,
        startDate: startDateWithFormat,
        endDate: endDateWithFormat
      }
      onFetchNewWallet(walletData);
    }

    return (
      <React.Fragment>
            <StandardTextField label="Nazwa" changed={(event) => inputChangeHandler(event)} value={walletName}/>
            <DatePicker label={'Od:'} date={startDate} onDateChange={handleStartDateChange}/>
            <DatePicker label={'Do:'} date={endDate} onDateChange={handleEndDateChange}/>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <Button 
                disabled={infoElementOpen} 
                style={{width: '251px', marginTop: '30px'}} 
                onClick={sendAction} variant="contained" 
                size="large" 
                color="primary"
                className={classes.margin}
                >Stwórz portfel</Button>
            </div>
              <Snackbars open={infoElementOpen} variant={infoElementVariant} message={infoElementText} onClose={onInfoELementClose}/>
      </React.Fragment>
    )
}

export default WelcomPage;