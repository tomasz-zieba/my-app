import * as actionTypes from '../actions/actionTypes';

const initialState = {
    incomes: [],
    expenses: [],
    totalIncome: 0,
    totalExpense: 0,
    startDate: null,
    endDate: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_WALLET_DATA : 
            return {
                ...state,
                incomes: action.incomes.reverse(),
                expenses: action.expenses.reverse(),
                totalIncome: action.totalIncome,
                totalExpense: action.totalExpense,
                startDate: action.startDate,
                endDate: action.endDate
            }
        case actionTypes.FETCH_NEW_INCOME : 
            const totalIncomeUpdated = +state.totalIncome + action.income.value
            let updatedIncomes = [];
            state.incomes !== null ? updatedIncomes = [...state.incomes, action.income ] : updatedIncomes = action.income;
            return {
                ...state,
                incomes: updatedIncomes, 
                totalIncome: totalIncomeUpdated
            }
        case actionTypes.FETCH_NEW_EXPENSE : 
            let totalExpenseUpdated = +state.totalExpense + action.expense.value
            let updatedExpenses = [];
            state.expenses !== null ? updatedExpenses = [action.expense, ...state.expenses] : updatedExpenses = action.expense;
            return {
                ...state,
                expenses: updatedExpenses, 
                totalExpense: totalExpenseUpdated
            }
        default :
            return state;
    }
}

export default reducer;