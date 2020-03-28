import * as actionTypes from '../actions/actionTypes';

const initialState = {
  name: '',
  incomes: [],
  expenses: [],
  totalIncome: 0,
  totalExpense: 0,
  startDate: null,
  endDate: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_WALLET_DATA:
      console.log(action);
      return {
        ...state,
        incomes: action.incomes.reverse(),
        expenses: action.expenses.reverse(),
        totalIncome: action.totalIncome,
        totalExpense: action.totalExpense,
        startDate: action.startDate,
        endDate: action.endDate,
        name: action.name,
      };
    case actionTypes.FETCH_NEW_INCOME: {
      const totalIncomeUpdated = +state.totalIncome + action.income.value;
      let updatedIncomes = [];
      if (state.incomes !== null) {
        updatedIncomes = [...state.incomes, action.income];
      } else {
        updatedIncomes = action.income;
      }
      return {
        ...state,
        incomes: updatedIncomes,
        totalIncome: totalIncomeUpdated,
      };
    }
    case actionTypes.FETCH_NEW_EXPENSE: {
      const totalExpenseUpdated = +state.totalExpense + action.expense.value;
      let updatedExpenses = [];
      if (state.expenses !== null) {
        updatedExpenses = [action.expense, ...state.expenses];
      } else {
        updatedExpenses = action.expense;
      }
      return {
        ...state,
        expenses: updatedExpenses,
        totalExpense: totalExpenseUpdated,
      };
    }
    default:
      return state;
  }
};

export default reducer;
