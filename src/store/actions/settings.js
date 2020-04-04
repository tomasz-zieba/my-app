import * as actionTypes from './actionTypes';
import * as action from './index';

export const onInfoELementOpen = (variant, text) => ({
  type: actionTypes.INFO_ELEMENT_OPEN,
  infoVariant: variant,
  infoText: text,
});
export const onInfoDialogOpen = () => ({
  type: actionTypes.INFO_DIALOG_OPEN,
});

export const addNewCategory = (categoryName, categoryType) => {
  if (categoryType === 'Income') {
    return {
      type: actionTypes.ADD_NEW_INCOME_CATEGORY,
      categoryName,
    };
  } if (categoryType === 'Expense') {
    return {
      type: actionTypes.ADD_NEW_EXPENSE_CATEGORY,
      categoryName,
    };
  }
  return true;
};

export const onIncomeCategoryAdd = (categoryName) => async (dispatch) => {
  dispatch(action.onRequestSended());
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('https://virtual-wallet-tz.herokuapp.com/add-category', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        categoryName,
        operationType: 'income',
      }),
    });

    if (res.status === 422) {
      throw new Error('Category already exists.');
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Adding a cateory failed!');
    }
    dispatch(action.onGetResponse());
    dispatch(addNewCategory(categoryName, 'Income'));
    dispatch(onInfoELementOpen('success', 'Kateogoria zapisana pomyślnie.'));
  } catch (err) {
    dispatch(action.onGetResponse());
    dispatch(onInfoELementOpen('error', err.message));
  }
};

export const onExpenseCategoryAdd = (categoryName) => async (dispatch) => {
  dispatch(action.onRequestSended());
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('https://virtual-wallet-tz.herokuapp.com/add-category', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        categoryName,
        operationType: 'expense',
      }),
    });
    if (res.status === 422) {
      throw new Error(
        'Category already exists.',
      );
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Adding a cateory failed!');
    }
    dispatch(action.onGetResponse());
    dispatch(addNewCategory(categoryName, 'Expense'));
    dispatch(onInfoELementOpen('success', 'Kateogoria zapisana pomyślnie.'));
  } catch (err) {
    dispatch(action.onGetResponse());
    dispatch(onInfoELementOpen('error', err.message));
  }
};
export const categoriesUpdate = (categoryNamesList, categoryType) => {
  if (categoryType === 'income') {
    return {
      type: actionTypes.INCOME_CATEGORIES_UPDATE,
      categoryNamesList,
    };
  }
  if (categoryType === 'expense') {
    return {
      type: actionTypes.EXPENSE_CATEGORIES_UPDATE,
      categoryNamesList,
    };
  }
  return true;
};
export const onCategoryRemove = (categoryNamesList, categoryType) => async (dispatch) => {
  dispatch(action.onRequestSended());
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('https://virtual-wallet-tz.herokuapp.com/remove-category', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        categoryNamesList,
        operationType: categoryType,
      }),
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Removing category failed!');
    }
    dispatch(action.onGetResponse());
    dispatch(categoriesUpdate(categoryNamesList, categoryType));
    dispatch(onInfoELementOpen('success', 'Kateogorie usunięte pomyślnie.'));
  } catch (err) {
    dispatch(action.onGetResponse());
    dispatch(onInfoELementOpen('error', 'Błąd połączenia. Kateogorie nie zostały zapisane.'));
  }
};

export const setCategories = (incomeCategories, expensCategories) => ({
  type: actionTypes.SET_CATEGORIES,
  incomeCategories,
  expenseCategories: expensCategories,
});

export const onSendCategoriesRequest = () => async (dispatch) => {
  dispatch(action.onRequestSended());
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('https://virtual-wallet-tz.herokuapp.com/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Fetching categories failed!');
    }
    dispatch(action.onGetResponse());
    const resData = await res.json();
    dispatch(setCategories(resData.incomeCategories, resData.expensCategories));
  } catch (err) {
    dispatch(action.onGetResponse());
    dispatch(onInfoELementOpen('error', 'Błąd połączenia. Nie można pobrać listy kategorii.'));
  }
};

export const onInfoELementClose = (event, reason) => {
  if (reason === 'clickaway') {
    return {
      type: actionTypes.INFO_ELEMENT_OPEN,
    };
  }
  return {
    type: actionTypes.INFO_ELEMENT_CLOSE,
  };
};

export const onInfoDialogClosed = () => ({
  type: actionTypes.INFO_DIALOG_CLOSE,
});

export const onRequestSended = () => ({
  type: actionTypes.REQUEST_SENDED,
});

export const onGetResponse = () => ({
  type: actionTypes.GET_RESPONSE,
});
