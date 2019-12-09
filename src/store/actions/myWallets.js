import * as actionTypes from './actionTypes';
import axios from '../../axios-wallets';
import * as action from './index';

export const fetchWalletsSuccess = (fetchedWallets) => {
    return {
        type: actionTypes.FETCH_WALLETS_SUCCESS,
        myWallets: fetchedWallets
    }
}

export const onSendWalletsRequest = () => {
    return (dispatch) => {
        axios.get('/VirtualWallet.json')
            .then (response => {
                let fetchedWallets = [];
                for (var key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        fetchedWallets.push({...response.data[key], key: key})
                    }
                }
                dispatch(fetchWalletsSuccess(fetchedWallets));
            })
            .catch(error => {
               dispatch(action.onInfoDialogOpen());
            });
    }
};

export const myWalletsUpdate = (walletKey) => {
    return {
        type: actionTypes.MY_WALLETS_UPDATE,
        walletKey: walletKey
    }
}

export const onWalletRemove = (walletKey) => {
    
    const removeFromWalletsBasicInfo = () => {
        return axios.delete('/VirtualWallet/' + walletKey + '.json');
    }
    const removeFromWalletsFullInfo = () => {
        return axios.delete('/Wallets/' + walletKey + '.json');
    }

    return (dispatch) => {
        Promise.all([removeFromWalletsBasicInfo(), removeFromWalletsFullInfo()])
        .then (response => {
            dispatch(myWalletsUpdate(walletKey));
            dispatch(action.onInfoELementOpen('success', 'Portfel usunięty pomyślnie.'));
        })
        .catch(error => {
            dispatch(action.onInfoELementOpen('error', 'Błąd połączenia z serwerem. Portfel nie został usunięty.'));
            console.log(error);
        });
    }
}

export const addToFavourites = (walletKey) => {
    return {
        type: actionTypes.WALLET_FAVOURITES_ADD,
        walletKey: walletKey
    }
}

export const onAddToFavourites = (walletKey) => {
    return (dispatch) => {
        axios.post('/VirtualWallet/' + walletKey + '/favourites.json', 'true')
            .then (response => {
                dispatch(addToFavourites(walletKey));
                dispatch(action.onInfoELementOpen('success', 'Portfel zapisany do ulubionych'));
            })
            .catch(error => {
                dispatch(action.onInfoELementOpen('error', 'Błąd połączenia z serwerem. Portfel nie został zapisany do ulubionych.'));
                console.log(error);
            });
    }
}

export const removeFromFavourites = (walletKey) => {
    return {
        type: actionTypes.WALLET_FAVOURITES_REMOVE,
        walletKey: walletKey
    }
}

export const onRemoveFromFavourites = (walletKey) => {
    return (dispatch) => {
        axios.delete('/VirtualWallet/' + walletKey + '/favourites.json')
            .then (response => {
                dispatch(removeFromFavourites(walletKey));
                dispatch(action.onInfoELementOpen('success', 'Portfel usunięty z ulubionych'));
            })
            .catch(error => {
                dispatch(action.onInfoELementOpen('error', 'Błąd połączenia z serwerem. Portfel nie został usunięty do ulubionych.'));
                console.log(error);
            });
    }
}
