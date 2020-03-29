import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

import * as actions from '../../store/actions/index';
import useStyles from '../../Style';
import Loader from '../../Components/Loader';
import DatePicker from '../../Components/DatePicker';
import StandardTextField from '../../Components/TextField';
import Snackbars from '../../Components/SnackBar';


function WelcomPage() {
  const [walletName, setWalletName] = useState('');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const classes = useStyles();


  const dispatch = useDispatch();
  const onInfoELementClose = (event, reason) => dispatch(actions.onInfoELementClose(event, reason));
  const onFetchNewWallet = (walletData) => dispatch(actions.onFetchNewWallet(walletData));

  const infoElementOpen = useSelector((state) => state.settings.infoElementOpen);
  const infoElementText = useSelector((state) => state.settings.infoElementText);
  const infoElementVariant = useSelector((state) => state.settings.infoElementVariant);
  const requestSended = useSelector((state) => state.settings.requestSended);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  function inputChangeHandler(event) {
    setWalletName(event.target.value);
  }
  function sendAction() {
    const walletData = {
      walletName,
      startDate,
      endDate,
    };
    onFetchNewWallet(walletData);
  }

  return (
    <>
      <StandardTextField label="Nazwa" changed={(event) => inputChangeHandler(event)} value={walletName} />
      <DatePicker label="Od:" date={startDate} onDateChange={handleStartDateChange} />
      <DatePicker label="Do:" date={endDate} onDateChange={handleEndDateChange} />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          style={{ width: '251px', marginTop: '30px' }}
          onClick={sendAction}
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
        >
          Stwórz portfel
        </Button>
      </div>
      {requestSended ? <Loader /> : ''}
      <Snackbars
        open={infoElementOpen}
        variant={infoElementVariant}
        message={infoElementText}
        onClose={onInfoELementClose}
      />
    </>
  );
}

export default WelcomPage;
