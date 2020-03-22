import * as actionTypes from './actionTypes';
import * as action from './index';

export const addNewCategory = (categoryName, categoryType) => {
    if(categoryType === 'Income') {
        return {
            type: actionTypes.ADD_NEW_INCOME_CATEGORY,
            categoryName: categoryName
        };
    } else if (categoryType === 'Expense') {
        return {
            type: actionTypes.ADD_NEW_EXPENSE_CATEGORY,
            categoryName: categoryName
        };
    };
};

export const onIncomeCategoryAdd = (categoryName) => {
    return (dispatch) => {
        dispatch(action.onRequestSended());
        const token = localStorage.getItem('token');
        fetch('https://virtual-wallet-tz.herokuapp.com/add-category', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                categoryName: categoryName,
                operationType: 'income'
            })
        })
        .then(res => {
            dispatch(action.onGetResponse());
            if (res.status === 422) {
                throw new Error(
                  "Category already exists."
                );
              }
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Adding a cateory failed!');
            }
            return res.json();
            })
        .then (resData => {
            dispatch(addNewCategory(categoryName, 'Income'));
            dispatch(onInfoELementOpen('success', 'Kateogoria zapisana pomyślnie.'));
        })
        .catch(error => {
            dispatch(onInfoELementOpen('error', error.message));
            console.log(error);
        });
    };
};

export const onExpenseCategoryAdd = (categoryName) => {
    return (dispatch) => {
        dispatch(action.onRequestSended());
        const token = localStorage.getItem('token');
        fetch('https://virtual-wallet-tz.herokuapp.com/add-category', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                categoryName: categoryName,
                operationType: 'expense'
            })
        })
        .then(res => {
            dispatch(action.onGetResponse());
            if (res.status === 422) {
                throw new Error(
                  "Category already exists."
                );
            }
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Adding a cateory failed!');
            }
            return res.json();
            })
        .then (resData => {
            dispatch(addNewCategory(categoryName, 'Expense'));
            dispatch(onInfoELementOpen('success', 'Kateogoria zapisana pomyślnie.'));
        })
        .catch(error => {
            dispatch(onInfoELementOpen('error', error.message));
            console.log(error);
        });
    };
};
export const categoriesUpdate = (categoryNamesList, categoryType) => {
    if(categoryType === 'income') {
        return {
            type: actionTypes.INCOME_CATEGORIES_UPDATE,
            categoryNamesList: categoryNamesList
        };
    }
    if(categoryType === 'expense') {
        return {
            type: actionTypes.EXPENSE_CATEGORIES_UPDATE,
            categoryNamesList: categoryNamesList
        };
    }
}
export const onCategoryRemove = (categoryNamesList, categoryType) => {
    return (dispatch) => {
        dispatch(action.onRequestSended());
        const token = localStorage.getItem('token');
        fetch('https://virtual-wallet-tz.herokuapp.com/remove-category', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                categoryNamesList: categoryNamesList,
                operationType: categoryType,
            })
        })
        .then(res => {
            dispatch(action.onGetResponse());
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Removing category failed!');
            }
            return res.json();
            })
        .then (resData => {
            dispatch(categoriesUpdate(categoryNamesList, categoryType));
                dispatch(onInfoELementOpen('success', 'Kateogorie usunięte pomyślnie.'));
        })
        .catch(error => {
            dispatch(onInfoELementOpen('error', 'Błąd połączenia. Kateogorie nie zostały zapisane.'));
            console.log(error);
        });
    };
};

export const setCategories = (incomeCategories, expensCategories) => {
    return {
        type: actionTypes.SET_CATEGORIES,
        incomeCategories: incomeCategories,
        expenseCategories: expensCategories
    };
};

export const onSendCategoriesRequest = () => {
    return (dispatch) => {
        dispatch(action.onRequestSended());
        const token = localStorage.getItem('token');
        fetch('https://virtual-wallet-tz.herokuapp.com/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            dispatch(action.onGetResponse());
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Fetching categories failed!');
            }
            return res.json();
            })
        .then (resData => {
            dispatch(setCategories(resData.incomeCategories, resData.expensCategories));
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

export const onRequestSended = () => {
    return {
        type: actionTypes.REQUEST_SENDED
    }
}

export const onGetResponse = () => {
    return {
        type: actionTypes.GET_RESPONSE
    }
}