import * as actionTypes from '../actions/actionTypes';

const initialState = {
    incomeCategories: [],
    expenseCategories: [],
    infoElementOpen: false,
    infoElementText: '',
    infoElementVariant: 'error',
    infoDialogOpen: false
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
            return {
                ...state,
                incomeCategories: [...state.incomeCategories, action.categoryName]
            }
        case actionTypes.ADD_NEW_EXPENSE_CATEGORY : 
            return {
                ...state,
                expenseCategories: [...state.expenseCategories, action.categoryName]
            }
        case actionTypes.INCOME_CATEGORIES_UPDATE :
            return {
                ...state,
                incomeCategories: state.incomeCategories.filter(category =>  !action.categoryKeys.includes(category.key))
            }
        case actionTypes.EXPENSE_CATEGORIES_UPDATE :
            return {
                ...state,
                expenseCategories: state.expenseCategories.filter(category =>  !action.categoryKeys.includes(category.key))
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
                infoDialogOpen: true
            }
        case actionTypes.INFO_DIALOG_CLOSE :
            return {
                ...state,
                infoDialogOpen: false
            }
        default :
            return state;
    }
}

export default reducer;