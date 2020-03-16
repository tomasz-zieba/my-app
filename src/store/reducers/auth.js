import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuth: false,
    token: null,
    userId: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_SUCCESS : 
            return {
                ...state,
                isAuth: true,
                token: action.token,
                userId: action.userId
            }
        case actionTypes.AUTH_FAIL : 
            return {
                ...state,
                isAuth: false,
                token: null,
                userId: null
            }
        case actionTypes.AUTH_LOGOUT :
            return {
                ...state,
                isAuth: false,
                token: null,
                userId: null
            }
        default :
            return state;
    }
}

export default reducer;