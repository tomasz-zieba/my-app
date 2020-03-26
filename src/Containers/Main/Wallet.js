import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@material-ui/styles';
import Media from 'react-media';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import WalletForm from '../../Components/walletForm/walletForm';
import * as actions from '../../store/actions/index';
import InfoLabel from '../../Components/InfoLabel';
import InfoDialog from '../../Components/DialogInfo';
import Loader from '../../Components/Loader';
import Snackbars from '../../Components/SnackBar';
import LatestOperations from '../../Components/LatestOperations/LatestOperations';
import Summary from '../../Components/summary';

function Wallet(props) {
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

  useEffect(() => {
    if (incomeCategories.length === 0 || expenseCategories.length === 0) {
      onSendCategoriesRequest();
    }
    onSendWalletRequest(props.match.params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    const colors = [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main, theme.palette.info.main, theme.palette.warning.main, theme.palette.error.main, theme.palette.primary.light, theme.palette.secondary.light, theme.palette.success.light, theme.palette.info.light, theme.palette.warning.light, theme.palette.error.light];
    const categoriesSummary = [];
    const usedCategoriesData = {};
    let expensesSum = 0;
    for (let i = 0; expenses.length > i; i++) {
      if (!usedCategoriesData.hasOwnProperty(expenses[i].category)) {
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
    for (const key in usedCategoriesData) {
      if (usedCategoriesData.hasOwnProperty(key)) {
        const { value } = usedCategoriesData[key];
        const percentageValue = ((value * 100) / expensesSum).toFixed(2);
        usedCategoriesData[key].value = percentageValue;
        categoriesSummary.push(usedCategoriesData[key]);
      }
    }
    setSummary(categoriesSummary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses]);

  const expenseClickHandler = (expenseData) => {
    onSaveExpense(expenseData);
  };
  const incomeClickHandler = (incomeData) => {
    onSaveIncome(incomeData);
  };

  const seeAllOperationsHandler = (operationsType) => () => {
    props.history.push({
      pathname: `${props.location.pathname}/all_operations`,
      hash: operationsType,
    });
  };

  const InfoELementClose = () => {
    onInfoDialogClosed();
    props.history.push('/');
  };

  const latestIncomes = incomes.filter((income, index) => index < 5);
  const latestExpense = expenses.filter((expense, index) => index < 5);
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
              walletKey={props.match.params.id}
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
              walletKey={props.match.params.id}
            />
          </div>
        )}
      />
      <Media
        query="(max-width: 979px)"
        render={() => (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InfoLabel
              style={{ width: '100%', marginBottom: '15px' }}
              value={totalIncome}
              name="WPŁYWY"
            />
            <InfoLabel
              style={{ width: '100%', marginBottom: '15px' }}
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
                walletKey={props.match.params.id}
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
                walletKey={props.match.params.id}
              />
            </Drawer>
          </div>
        )}
      />
      <LatestOperations operations={latestIncomes} label="Ostatnie wpłaty" operationstype="incomes" onClick={seeAllOperationsHandler} buttonmore={incomes.length > 5 ? 'true' : 'false'} />
      <LatestOperations operations={latestExpense} label="Ostatnie wypłaty" operationstype="expenses" onClick={seeAllOperationsHandler} buttonmore={expenses.length > 5 ? 'true' : 'false'} />
      <Summary summarydata={summary} title="Staystyki wydatków" />
      {requestSended ? <Loader /> : ''}
      <InfoDialog open={infoDialogOpen} text={errorInfo} handleClose={InfoELementClose} />
      <Snackbars open={infoElementOpen} variant={infoElementVariant} message={infoElementText} onClose={onInfoELementClose} />
    </>
  );
}

export default withRouter(Wallet);
