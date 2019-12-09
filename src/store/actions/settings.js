import * as actionTypes from './actionTypes';
import axios from '../../axios-wallets';


export const addNewCategory = (categoryName, key, categoryType) => {
    if(categoryType === 'Income') {
        return {
            type: actionTypes.ADD_NEW_INCOME_CATEGORY,
            categoryName: {name: categoryName, key: key}
        };
    } else if (categoryType === 'Expense') {
        return {
            type: actionTypes.ADD_NEW_EXPENSE_CATEGORY,
            categoryName: {name: categoryName, key: key}
        };
    };
};

export const onIncomeCategoryAdd = (categoryName) => {
    return (dispatch) => {
        axios.post('/Categories/incomeCategories.json', {categoryName: categoryName})
            .then (response => {
                dispatch(addNewCategory(categoryName, response.data.name, 'Income'));
                dispatch(onInfoELementOpen('success', 'Kateogoria zapisana pomyślnie.'));
            })
            .catch(error => {
                dispatch(onInfoELementOpen('error', 'Błąd połączenia. Kateogoria nie została zapisana.'));
                console.log(error);
            });
    };
};

export const onExpenseCategoryAdd = (categoryName) => {
    return (dispatch) => {
        axios.post('/Categories/expenseCategories.json', {categoryName: categoryName})
            .then (response => {
                dispatch(addNewCategory(categoryName, response.data.name, 'Expense'));
                dispatch(onInfoELementOpen('success', 'Kateogoria zapisana pomyślnie.'));
            })
            .catch(error => {
                dispatch(onInfoELementOpen('error', 'Błąd połączenia. Kateogoria nie została zapisana.'));
                console.log(error);
            });
    };
};
export const categoriesUpdate = (categoryKeys, categoryType) => {
    if(categoryType === 'income') {
        return {
            type: actionTypes.INCOME_CATEGORIES_UPDATE,
            categoryKeys: categoryKeys
        };
    }
    if(categoryType === 'expense') {
        console.log('test');
        return {
            type: actionTypes.EXPENSE_CATEGORIES_UPDATE,
            categoryKeys: categoryKeys
        };
    }
}
export const onCategoryRemove = (categoryKeys, categoryType) => {
    const categoriesRemove = categoryKeys.map(categoryKey => {
        return axios.delete('/Categories/' + categoryType + 'Categories/' + categoryKey + '.json')
    });
    return (dispatch) => {
        Promise.all(categoriesRemove)
            .then (response => {
                dispatch(categoriesUpdate(categoryKeys, categoryType));
                dispatch(onInfoELementOpen('success', 'Kateogorie usunięte pomyślnie.'));
            })
            .catch(error => {
                dispatch(onInfoELementOpen('error', 'Błąd połączenia. Kateogorie nie zostały zapisane.'));
                console.log(error);
            });
    };
};

export const setCategories= (categories) => {
    const categoriesIncome = [];
    const categoriesExpense = [];

    for (var key in categories.incomeCategories) {
        if (categories.incomeCategories.hasOwnProperty(key)) {
            categoriesIncome.push({ name: categories.incomeCategories[key].categoryName, key: key });
        };
    };

    for (var key in categories.expenseCategories) {
        if (categories.expenseCategories.hasOwnProperty(key)) {
            categoriesExpense.push({ name: categories.expenseCategories[key].categoryName, key: key });
        };
    };
    return {
        type: actionTypes.SET_CATEGORIES,
        incomeCategories: categoriesIncome,
        expenseCategories: categoriesExpense
    };
};

export const onSendCategoriesRequest = () => {

    return (dispatch) => {
        axios.get('/Categories.json')
            .then (response => {
                dispatch(setCategories(response.data));
            })
            .catch(error => {
                console.log(error);
            });
    };
};

export const onInfoELementOpen = (variant, text) => {
    return {
        type: actionTypes.INFO_ELEMENT_OPEN,
        infoVariant: variant,
        infoText: text
    };
};
export const onInfoDialogOpen = () => {
    return {
        type: actionTypes.INFO_DIALOG_OPEN,
    };
};

export const onInfoELementClose = (event, reason) => {
    if (reason === 'clickaway') {
        return {
            type: actionTypes.INFO_ELEMENT_OPEN
        }
    } else {
        return {
            type: actionTypes.INFO_ELEMENT_CLOSE
        };
    };
};

export const onInfoDialogClosed = () => {
    return {
        type: actionTypes.INFO_DIALOG_CLOSE
    }
}