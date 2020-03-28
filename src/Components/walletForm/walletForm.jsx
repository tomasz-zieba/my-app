import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import DatePicker from '../DatePicker';
import StandardTextField from '../TextField';
import Select from '../Select';
import * as actions from '../../store/actions/index';

function Expanditure({
  label, dateLabel, categories, clickHandler, walletKey,
}) {
  const [value, setValue] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [date, seteDate] = useState(new Date());
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();
  const onInfoELementOpen = (type, message) => dispatch(actions.onInfoELementOpen(type, message));

  const walletStartDate = useSelector((state) => state.wallet.startDate);
  const walletEndDate = useSelector((state) => state.wallet.endDate);

  const useStyles = makeStyles((theme) => ({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      textAlign: 'center',
      fontWeight: 700,
      color: theme.palette.primary.dark,
      borderBottom: 'solid 1px',
      borderColor: theme.palette.primary.dark,
      marginBottom: '30px',
    },
    select: {
      margin: '0 auto',
    },
  }));

  const classes = useStyles();

  const handleDateChange = (operationDate) => {
    seteDate(operationDate);
  };

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };
  const inputChangeHandler = (event) => {
    setAdditionalInfo(event.target.value);
  };
  const OptionHandleChange = (event) => {
    setCategory(event.target.value);
  };

  const sendRequest = () => {
    if (Number.isNaN(date.getTime())) {
      onInfoELementOpen('error', 'Podaj prawidłową datę.');
      return false;
    }
    if (value === '') {
      onInfoELementOpen('error', 'Podaj kwotę transakcji.');
      return false;
    }
    if (category === '') {
      onInfoELementOpen('error', 'Podaj kategorię transakcji.');
      return false;
    }
    // eslint-disable-next-line max-len
    if (!(new Date(walletStartDate).setHours(0, 0, 0, 0) <= new Date(date).setHours(0, 0, 0, 0) && new Date(walletEndDate).setHours(0, 0, 0, 0) >= new Date(date).setHours(0, 0, 0, 0))) {
      onInfoELementOpen('error', 'Data transakcji nie znajduje się w dacie ważności portfela.');
      return false;
    }

    const dateWithFormat = `${date.getFullYear().toString()}-${(date.getMonth() + 1).toString()}-${date.getDate().toString()}`;
    const fetchData = {
      key: walletKey,
      date: dateWithFormat,
      value,
      info: additionalInfo,
      category,
    };
    clickHandler(fetchData);
    setValue('');
    setAdditionalInfo('');
    seteDate(new Date());
    setCategory('');
    return true;
  };

  return (
    <div style={{ width: '300px' }}>
      <div className={classes.root}>{label}</div>
      <DatePicker label={dateLabel} date={date} onDateChange={handleDateChange} />
      <StandardTextField
        label="Kwota"
        type="number"
        value={value}
        changed={valueChangeHandler}
      />
      <StandardTextField
        label="Dodatkowe informacje"
        value={additionalInfo}
        changed={inputChangeHandler}
        type="text"
      />
      <Select
        categories={categories}
        optionCategory={category}
        handleChange={OptionHandleChange}
      />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          onClick={sendRequest}
          style={{ width: '251px', marginTop: '30px' }}
          variant="contained"
          size="large"
          color="primary"
          className={classes.margin}
        >
          Wyślij
        </Button>
      </div>
    </div>
  );
}

export default Expanditure;

Expanditure.propTypes = {
  label: PropTypes.string.isRequired,
  dateLabel: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  clickHandler: PropTypes.func.isRequired,
  walletKey: PropTypes.string.isRequired,
};
