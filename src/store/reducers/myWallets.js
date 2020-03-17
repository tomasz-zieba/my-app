import * as actionTypes from '../actions/actionTypes';

const initialState = {
    myWallets: undefined
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_WALLETS_SUCCESS : 
            return {
                ...state,
                myWallets: action.myWallets
            }
        case actionTypes.MY_WALLETS_UPDATE :
            const walletsUpdated = state.myWallets.filter(wallet => wallet.walletId !== action.walletId )
            return {
                ...state,
                myWallets: walletsUpdated
            }
        case actionTypes.WALLET_FAVOURITES_ADD :
            const walletsFavouritesAddUpdated = state.myWallets.map(wallet => {
                if(wallet.key === action.walletKey){
                    wallet.favourites = true;
                }
                return wallet
            })
            return {
                ...state,
                myWallets: walletsFavouritesAddUpdated
            };
        case actionTypes.WALLET_FAVOURITES_REMOVE :
            const walletsFavouritesRemoveUpdated = state.myWallets.map(wallet => {
                if(wallet.key === action.walletKey){
                    delete wallet.favourites;
                }
                return wallet
            })
            return {
                ...state,
                myWallets: walletsFavouritesRemoveUpdated
            }
        case actionTypes.WALLETS_CLEAR : 
            return {}
        default :
            return state
    }
}

export default reducer;