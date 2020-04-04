import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Media from 'react-media';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import WalletForm from '../../Components/walletForm/walletForm';
import * as actions from '../../store/actions/index';
import InfoLabel from '../../Components/InfoLabel';
import InfoDialog from '../../Components/DialogInfo';
import Loader from '../../Components/Loader';
import Snackbars from '../../Components/SnackBar';
import LatestOperations from '../../Components/LatestOperations/LatestOperations';
import Summary from '../../Components/summary';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  Paper: {
    width: '100%',
    height: 'auto',
    margin: '0 0 15px 0',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
}));

function Wallet({ history, location, match }) {
  const theme = useTheme();
  const [summary, setSummary] = useState([]);
  const [expenseDrawerOpen, setExpenseDrawerOpen] = useState(false);
  const [incomeDrawerOpen, setIncomeDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const onSendWalletRequest = (walletId) => dispatch(actions.onSendWalletRequest(walletId));
  const onSendCategoriesRequest = () => dispatch(actions.onSendCategoriesRequest());
  const onSaveExpense = (data) => dispatch(actions.onSaveExpense(data));
  const onSaveIncome = (data) => dispatch(actions.onSaveIncome(data));
  const onInfoELementClose = (event, reason) => dispatch(actions.onInfoELementClose(event, reason));
  const onInfoDialogClosed = () => dispatch(actions.onInfoDialogClosed());

  const walletName = useSelector((state) => state.wallet.name);
  const walletStartDate = useSelector((state) => state.wallet.startDate);
  const walletEndDate = useSelector((state) => state.wallet.endDate);
  const incomes = useSelector((state) => state.wallet.incomes);
  const expenses = useSelector((state) => state.wallet.expenses);
  const incomeCategories = useSelector((state) => state.settings.incomeCategories);
  const expenseCategories = useSelector((state) => state.settings.expenseCategories);
  const totalIncome = useSelector((state) => state.wallet.totalIncome);
  const totalExpense = useSelector((state) => state.wallet.totalExpense);
  const infoElementOpen = useSelector((state) => state.settings.infoElementOpen);
  const infoElementVariant = useSelector((state) => state.settings.infoElementVariant);
  const infoDialogOpen = useSelector((state) => state.settings.infoDialogOpen);
  const infoElementText = useSelector((state) => state.settings.infoElementText);
  const requestSended = useSelector((state) => state.settings.requestSended);

  const errorInfo = {
    label: 'Ups! Coś poszło nie tak.',
    paragraph: 'Wystąpił problem z połączeniem z serwerem lub nie masz uprawnień do tego portfela.',
    buttonText: 'Przejdź na stronę główną',
  };

  const classes = useStyles();

  useEffect(() => {
    if (incomeCategories.length === 0 || expenseCategories.length === 0) {
      onSendCategoriesRequest();
    }
    onSendWalletRequest(match.params.id);
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    const colors = [
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.success.main,
      theme.palette.info.main,
      theme.palette.warning.main,
      theme.palette.error.main,
      theme.palette.primary.light,
      theme.palette.secondary.light,
      theme.palette.success.light,
      theme.palette.info.light,
      theme.palette.warning.light,
      theme.palette.error.light,
    ];
    const categoriesSummary = [];
    const usedCategoriesData = {};
    let expensesSum = 0;
    for (let i = 0; expenses.length > i; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(usedCategoriesData, expenses[i].category)) {
        usedCategoriesData[expenses[i].category] = {
          title: expenses[i].category,
          value: parseFloat(expenses[i].value),
          color: colors[i],
        };
      } else {
        usedCategoriesData[expenses[i].category].value += parseFloat(expenses[i].value);
      }
      expensesSum += parseFloat(expenses[i].value);
    }

    Object.keys(usedCategoriesData).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(usedCategoriesData, key)) {
        const { value } = usedCategoriesData[key];
        const percentageValue = ((value * 100) / expensesSum).toFixed(2);
        usedCategoriesData[key].value = percentageValue;
        categoriesSummary.push(usedCategoriesData[key]);
      }
    });

    setSummary(categoriesSummary);
    // eslint-disable-next-line
  }, [expenses]);

  const expenseClickHandler = (expenseData) => {
    onSaveExpense(expenseData);
    setExpenseDrawerOpen(false);
  };
  const incomeClickHandler = (incomeData) => {
    onSaveIncome(incomeData);
    setIncomeDrawerOpen(false);
  };

  const seeAllOperationsHandler = (operationsType) => () => {
    history.push({
      pathname: `${location.pathname}/all_operations`,
      hash: operationsType,
    });
  };

  const InfoELementClose = () => {
    onInfoDialogClosed();
    history.push('/');
  };

  const latestIncomes = incomes.filter((income, index) => index < 5);
  const latestExpense = expenses.filter((expense, index) => index < 5);
  let startDate;
  let endDate;
  if (walletStartDate != null && walletEndDate != null) {
    [startDate] = walletStartDate.split('T');
    [endDate] = walletEndDate.split('T');
  }

  return (
    <>
      <Media
        query="(min-width: 980px)"
        render={() => (
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            <WalletForm
              label="Dodaj nową transakcję"
              dateLabel="Data transakcji: "
              categories={expenseCategories}
              clickHandler={(data) => expenseClickHandler(data)}
              walletKey={match.params.id}
            />
            <div>
              <InfoLabel value={totalIncome} name="WPŁYWY" />
              <InfoLabel value={totalExpense} name="WYDATKI" />
            </div>
            <WalletForm
              label="Zasil konto"
              dateLabel="Data wpływu: "
              categories={incomeCategories}
              clickHandler={(data) => incomeClickHandler(data)}
              walletKey={match.params.id}
            />
          </div>
        )}
      />
      <Media
        query="(max-width: 979px)"
        render={() => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className={classes.root}>
              <Paper elevation={3} className={classes.Paper}>
                <div style={{ fontSize: '16px' }}>
                  {walletName}
                </div>
                <div style={{ fontSize: '13px' }}>
                  {startDate}
                  {' - '}
                  {endDate}
                </div>
              </Paper>
            </div>
            <InfoLabel
              value={totalIncome}
              name="WPŁYWY"
            />
            <InfoLabel
              value={totalExpense}
              name="WYDATKI"
            />
            <Button
              style={{ width: '100%', marginBottom: '15px' }}
              onClick={() => setExpenseDrawerOpen(true)}
              color="primary"
              variant="contained"
              size="large"
            >
              Dodaj transakcję
            </Button>
            <Button
              style={{ width: '100%', marginBottom: '15px' }}
              onClick={() => setIncomeDrawerOpen(true)}
              variant="contained"
              size="large"
              color="primary"
              autoFocus
            >
              Zasil portfel
            </Button>
            <Drawer
              anchor="right"
              open={expenseDrawerOpen}
              onClose={() => setExpenseDrawerOpen(false)}
            >
              <WalletForm
                label="Dodaj nową transakcję"
                dateLabel="Data transakcji: "
                categories={expenseCategories}
                clickHandler={(data) => expenseClickHandler(data)}
                walletKey={match.params.id}
              />
            </Drawer>
            <Drawer
              anchor="right"
              open={incomeDrawerOpen}
              onClose={() => setIncomeDrawerOpen(false)}
            >
              <WalletForm
                label="Zasil konto"
                dateLabel="Data wpływu: "
                categories={incomeCategories}
                clickHandler={(data) => incomeClickHandler(data)}
                walletKey={match.params.id}
              />
            </Drawer>
          </div>
        )}
      />
      <LatestOperations operations={latestIncomes} label="Ostatnie wpłaty" operationstype="incomes" onClick={seeAllOperationsHandler} buttonmore={incomes.length > 5 ? 'true' : 'false'} />
      <LatestOperations operations={latestExpense} label="Ostatnie transakcje" operationstype="expenses" onClick={seeAllOperationsHandler} buttonmore={expenses.length > 5 ? 'true' : 'false'} />
      <Summary summarydata={summary} title="Staystyki wydatków" />
      {requestSended ? <Loader /> : ''}
      <InfoDialog open={infoDialogOpen} text={errorInfo} handleClose={InfoELementClose} />
      <Snackbars
        open={infoElementOpen}
        variant={infoElementVariant}
        message={infoElementText}
        onClose={onInfoELementClose}
      />
    </>
  );
}

export default withRouter(Wallet);


Wallet.propTypes = {
  history: PropTypes.objectOf((PropTypes.any)).isRequired,
  location: PropTypes.objectOf((PropTypes.any)).isRequired,
  match: PropTypes.objectOf((PropTypes.any)).isRequired,
};
