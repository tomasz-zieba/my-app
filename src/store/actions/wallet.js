import * as actionTypes from './actionTypes';
import * as action from './index';

export const setWalletData = (walletData) => {
  if (walletData === null) {
    return {
      type: actionTypes.SET_WALLET_DATA,
      incomes: [],
      expenses: [],
      totalIncome: 0,
      totalExpense: 0,
      startDate: null,
      endDate: null,
    };
  }

  const incomes = [];
  const expenses = [];
  let totalIncome = 0;
  let totalExpense = 0;
  walletData.wallet.incomes.forEach((income) => {
    totalIncome += income.value;
    incomes.push(income);
  });
  walletData.wallet.expenses.forEach((expense) => {
    totalExpense += expense.value;
    expenses.push(expense);
  });
  return {
    type: actionTypes.SET_WALLET_DATA,
    incomes,
    expenses,
    totalIncome,
    totalExpense,
    startDate: walletData.wallet.startDate,
    endDate: walletData.wallet.endDate,
    name: walletData.wallet.title,
  };
};

export const onSendWalletRequest = (walletId) => async (dispatch) => {
  dispatch(action.onRequestSended());
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`https://virtual-wallet-tz.herokuapp.com/wallet/${walletId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 404) {
      throw new Error('Could not find wallet.');
    }
    if (res.status === 403) {
      throw new Error('Not authorized.');
    }
    if (res.status !== 200) {
      throw new Error('Failed to fetch wallet data.');
    }
    dispatch(action.onGetResponse());
    const resData = await res.json();
    dispatch(setWalletData(resData));
  } catch (err) {
    dispatch(action.onGetResponse());
    dispatch(action.onInfoDialogOpen(err.message));
  }
};

export const onExpenseUpdate = (response) => {
  const newExpense = {
    key: response.key,
    date: response.date,
    value: response.value,
    info: response.info,
    category: response.category,
    _id: response.operationId,
  };

  return {
    type: actionTypes.FETCH_NEW_EXPENSE,
    expense: newExpense,
  };
};

export const onSaveExpense = (data) => async (dispatch) => {
  dispatch(action.onRequestSended());

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const walletId = data.key;
  const { category } = data;
  const { date } = data;
  const { info } = data;
  const value = parseFloat(data.value);
  try {
    const res = await fetch('https://virtual-wallet-tz.herokuapp.com/wallet-expense', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        walletId,
        user: userId,
        category,
        date,
        info,
        value,
      }),
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Adding new expense failed!');
    }
    dispatch(action.onGetResponse());
    const resData = await res.json();
    dispatch(onExpenseUpdate(resData));
    dispatch(action.onInfoELementOpen('success', 'Zasilenie konta zapisane pomyślnie.'));
  } catch (err) {
    dispatch(action.onGetResponse());
    dispatch(action.onInfoELementOpen('error', 'Błąd połączenia. Zasilenie konta nie zostało zapisane.'));
  }
};

export const onIncomeUpdate = (response) => {
  const newIncome = {
    date: response.date,
    value: response.value,
    info: response.info,
    category: response.category,
    _id: response.operationId,
  };

  return {
    type: actionTypes.FETCH_NEW_INCOME,
    income: newIncome,
  };
};

export const onSaveIncome = (data) => async (dispatch) => {
  dispatch(action.onRequestSended());
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const walletId = data.key;
  const { category } = data;
  const { date } = data;
  const { info } = data;
  const value = parseFloat(data.value);
  try {
    const res = await fetch('https://virtual-wallet-tz.herokuapp.com/wallet-income', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        walletId,
        user: userId,
        category,
        date,
        info,
        value,
      }),
    });

    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Adding new income failed!');
    }
    dispatch(action.onGetResponse());
    const resData = await res.json();
    dispatch(onIncomeUpdate(resData));
    dispatch(action.onInfoELementOpen('success', 'Zasilenie konta zapisane pomyślnie.'));
  } catch (err) {
    dispatch(action.onGetResponse());
    dispatch(action.onInfoELementOpen('error', 'Błąd połączenia. Zasilenie konta nie zostało zapisane.'));
  }
};
