import React, { useState } from 'react';
import axios from '../../axios-wallets';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
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
      props.onFetchNewWallet(walletData);
    }

    return (
      <React.Fragment>
            <StandardTextField label="Nazwa" changed={(event) => inputChangeHandler(event)} value={walletName}/>
            <DatePicker label={'Od:'} date={startDate} onDateChange={handleStartDateChange}/>
            <DatePicker label={'Do:'} date={endDate} onDateChange={handleEndDateChange}/>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <Button 
                disabled={props.infoElementOpen} 
                style={{width: '251px', marginTop: '30px'}} 
                onClick={sendAction} variant="contained" 
                size="large" 
                color="primary" 
                className={classes.margin}
                >Stwórz portfel</Button>
            </div>
              <Snackbars open={props.infoElementOpen} variant={props.infoElementVariant} message={props.infoElementText} onClose={props.onInfoELementClose}/>
      </React.Fragment>
    )
}


const mapStateToProps = state => {
  return {
    infoElementOpen: state.settings.infoElementOpen,
    infoElementText: state.settings.infoElementText,
    infoElementVariant:state.settings.infoElementVariant
  };
};

const mapDispatchToProps = dispatch => {
  return {
      onInfoELementOpen: () => dispatch(actions.onInfoELementOpen()),
      onInfoELementClose: (event, reason) => dispatch(actions.onInfoELementClose(event, reason)),
      onFetchNewWallet: (walletData) => dispatch(actions.onFetchNewWallet(walletData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomPage, axios);