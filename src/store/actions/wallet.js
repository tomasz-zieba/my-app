import * as actionTypes from './actionTypes';
import * as action from './index';

export const setWalletData = (walletData) => {
    if(walletData === null) {
        return {
            type: actionTypes.SET_WALLET_DATA,
            incomes: [],
            expenses: [],
            totalIncome: 0,
            totalExpense: 0,
            startDate: null,
            endDate: null
        }
    }

    let incomes = [];
    let expenses = [];
    let totalIncome = 0;
    let totalExpense = 0;
    walletData.wallet.incomes.forEach( income => {
        totalIncome += income.value;
        incomes.push(income);
    });
    walletData.wallet.expenses.forEach( expense => {
        totalExpense += expense.value;
        expenses.push(expense);
    });
    return {
        type: actionTypes.SET_WALLET_DATA,
        incomes: incomes,
        expenses: expenses,
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        startDate: walletData.wallet.startDate,
        endDate: walletData.wallet.endDate
    }
}

export const onSendWalletRequest = (walletId) => {
    return (dispatch) => {
        dispatch(action.onRequestSended());

        const token = localStorage.getItem('token');
        fetch('https://virtual-wallet-tz.herokuapp.com/wallet/' + walletId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            dispatch(action.onGetResponse());
            if (res.status === 404) {
                throw new Error('Could not find wallet.');
            }
            if (res.status === 403) {
                throw new Error('Not authorized.');
            }
            if (res.status !== 200) {
                throw new Error('Failed to fetch wallet data.');
            }
            return res.json();
            })
        .then (resData => {
            dispatch(setWalletData(resData));
        })
        .catch(error => {
            dispatch(action.onInfoDialogOpen(error.message));
        });
    }
};

export const onExpenseUpdate = (response) => {
    const newExpense = {
        key: response.key,
        date: response.date,
        value: response.value,
        info: response.info,
        category: response.category,
        _id: response.operationId
    }

    return {
        type: actionTypes.FETCH_NEW_EXPENSE,
        expense: newExpense,
    }
};

export const onSaveExpense = (data) => {
    return (dispatch) => {
        dispatch(action.onRequestSended());

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const walletId = data.key;
        const category = data.category;
        const date = data.date;
        const info = data.info;
        const value = parseFloat(data.value);
        fetch('https://virtual-wallet-tz.herokuapp.com/wallet-expense', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                walletId: walletId,
                user: userId,
                category: category,
                date: date,
                info: info,
                value: value
            })
        })
        .then(res => {
            dispatch(action.onGetResponse());
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Adding new expense failed!');
            }
            return res.json();
            })
        .then (resData => {
            dispatch(onExpenseUpdate(resData));
            dispatch(action.onInfoELementOpen('success', 'Zasilenie konta zapisane pomyślnie.'));
        })
        .catch(error => {
            console.log(error);
            dispatch(action.onInfoELementOpen('error', 'Błąd połączenia. Zasilenie konta nie zostało zapisane.'));
        });
    }
};

export const onIncomeUpdate = (response) => {
    const newIncome = {
        date: response.date,
        value: response.value,
        info: response.info,
        category: response.category,
        _id: response.operationId
    }

    return {
        type: actionTypes.FETCH_NEW_INCOME,
        income: newIncome,
    }
};

export const onSaveIncome = (data) => {
    return (dispatch) => {
        dispatch(action.onRequestSended());

        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const walletId = data.key;
        const category = data.category;
        const date = data.date;
        const info = data.info;
        const value = parseFloat(data.value);
        fetch('https://virtual-wallet-tz.herokuapp.com/wallet-income', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                walletId: walletId,
                user: userId,
                category: category,
                date: date,
                info: info,
                value: value
            })
        })
        .then(res => {
            dispatch(action.onGetResponse());
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Adding new income failed!');
            }
            return res.json();
        })
        .then (resData => {
            dispatch(onIncomeUpdate(resData));
            dispatch(action.onInfoELementOpen('success', 'Zasilenie konta zapisane pomyślnie.'));
        })
        .catch(error => {
            console.log(error);
            dispatch(action.onInfoELementOpen('error', 'Błąd połączenia. Zasilenie konta nie zostało zapisane.'));
        });
    }
};