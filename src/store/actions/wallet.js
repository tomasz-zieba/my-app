import * as actionTypes from './actionTypes';
import axios from '../../axios-wallets';
import * as action from './index';

export const setWalletData = (walletData) => {

    if(walletData === null) {
        return {
            type: actionTypes.SET_WALLET_DATA,
            incomes: [],
            expenses: [],
            totalIncome: 0,
            totalExpense: 0
        }
    }

    let incomes = [];
    let expenses = [];
    let totalIncome = 0;
    let totalExpense = 0;
    for (var incomesKey in walletData.incomes) {
        if (walletData.incomes.hasOwnProperty(incomesKey)) {
            totalIncome += +walletData.incomes[incomesKey].value;
            walletData.incomes[incomesKey].operationKey = incomesKey;
            incomes.push(walletData.incomes[incomesKey]);
        }
    }
    for (var expenseKey in walletData.expenses) {
        if (walletData.expenses.hasOwnProperty(expenseKey)) {
            totalExpense += +walletData.expenses[expenseKey].value;
            walletData.expenses[expenseKey].operationKey = expenseKey;
            expenses.push(walletData.expenses[expenseKey]);
        }
    }
    return {
        type: actionTypes.SET_WALLET_DATA,
        incomes: incomes,
        expenses: expenses,
        totalIncome: totalIncome,
        totalExpense: totalExpense
    }
}

export const onSendWalletRequest = (walletId) => {
    return (dispatch) => {
        axios.get('/Wallets/' + walletId + '.json')
            .then (response => {
                dispatch(setWalletData(response.data));
                // dispatch(setTotalExpense(response.data.expenses));
            })
            .catch(error => {
            //    dispatch(onInfoELementOpen());
            });
    }
};

export const onExpenseUpdate = (expenseData, response) => {
    const newExpense = {
        key: expenseData.key,
        date: expenseData.date,
        value: expenseData.value,
        info: expenseData.info,
        category: expenseData.category,
        operationKey: response.data.name
    }

    return {
        type: actionTypes.FETCH_NEW_EXPENSE,
        expense: newExpense,
    }
};

export const onSaveExpense = (data) => {
    return (dispatch) => {
        axios.post('/Wallets/' + data.key + '/expenses.json', data)
            .then (response => {
                dispatch(action.onInfoELementOpen('success', 'Transakcja zapisana pomyślnie'));
                dispatch(onExpenseUpdate(data, response));
            })
            .catch(error => {
                console.log(error);
                dispatch(action.onInfoELementOpen('error', 'Błąd połączenia. Transakcja nie została zapisana.'));
            });
    }
};

export const onIncomeUpdate = (incomeData, response) => {
    const newIncome = {
        key: incomeData.key,
        date: incomeData.date,
        value: incomeData.value,
        info: incomeData.info,
        category: incomeData.category,
        operationKey: response.data.name
    }

    return {
        type: actionTypes.FETCH_NEW_INCOME,
        income: newIncome,
    }
};

export const onSaveIncome = (data) => {
    return (dispatch) => {
        axios.post('/Wallets/' + data.key + '/incomes.json', data)
            .then (response => {
                dispatch(action.onInfoELementOpen('success', 'Zasilenie konta zapisane pomyślnie.'));
                dispatch(onIncomeUpdate(data, response));
            })
            .catch(error => {
                console.log(error);
                dispatch(action.onInfoELementOpen('error', 'Błąd połączenia. Zasilenie konta nie zostało zapisane.'));
            });
    }
};