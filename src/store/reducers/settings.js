import * as actionTypes from '../actions/actionTypes';

const initialState = {
    incomeCategories: [],
    expenseCategories: [],
    infoElementOpen: false,
    infoElementText: '',
    infoElementVariant: 'error',
    infoDialogOpen: false,
    requestSended: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_CATEGORIES :
            return {
                ...state,
                incomeCategories: action.incomeCategories,
                expenseCategories: action.expenseCategories
            }
        case actionTypes.ADD_NEW_INCOME_CATEGORY : 
            const updatedIncomeCategories = [...state.incomeCategories];
            if (!updatedIncomeCategories.includes(action.categoryName)) {
                updatedIncomeCategories.push(action.categoryName);
            }
            return {
                ...state,
                incomeCategories: [...updatedIncomeCategories]
            }
        case actionTypes.ADD_NEW_EXPENSE_CATEGORY : 
            const updatedExpenseCategories = [...state.expenseCategories];
            if (!updatedExpenseCategories.includes(action.categoryName)) {
                updatedExpenseCategories.push(action.categoryName);
            }
            return {
                ...state,
                expenseCategories: [...updatedExpenseCategories]
            }
        case actionTypes.INCOME_CATEGORIES_UPDATE :
            return {
                ...state,
                incomeCategories: state.incomeCategories.filter(categoryName =>  !action.categoryNamesList.includes(categoryName))
            }
        case actionTypes.EXPENSE_CATEGORIES_UPDATE :
            return {
                ...state,
                expenseCategories: state.expenseCategories.filter(categoryName =>  !action.categoryNamesList.includes(categoryName))
            }
        case actionTypes.INFO_ELEMENT_OPEN : 
            if(action.infoText === undefined || action.infoVariant === undefined) {
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    infoElementOpen: true,
                    infoElementText: action.infoText,
                    infoElementVariant: action.infoVariant
                }
            };
        case actionTypes.INFO_ELEMENT_CLOSE : 
            return {
                ...state,
                infoElementOpen: false
            }
        case actionTypes.INFO_DIALOG_OPEN :
            return {
                ...state,
                infoDialogOpen: true,
            }
        case actionTypes.INFO_DIALOG_CLOSE :
            return {
                ...state,
                infoDialogOpen: false
            }
        case actionTypes.REQUEST_SENDED :
                return {
                    ...state,
                    requestSended: true
                }
        case actionTypes.GET_RESPONSE :
            return {
                ...state,
                requestSended: false
            }
        default :
            return state;
    }
}

export default reducer;