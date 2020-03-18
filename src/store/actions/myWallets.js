import * as actionTypes from './actionTypes';
import axios from '../../axios-wallets';
import * as action from './index';

export const fetchWalletsSuccess = (fetchedWallets) => {
    return {
        type: actionTypes.FETCH_WALLETS_SUCCESS,
        myWallets: fetchedWallets
    }
}

export const clearWallets = () => {
    return {
        type: actionTypes.WALLETS_CLEAR,
    }
}

export const onSendWalletsRequest = () => {
    return (dispatch) => {
        dispatch(clearWallets());
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/wallets', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Deleting a post failed!');
            }
            return res.json();
            })
        .then(resData => {
            let fetchedWallets = [];
            resData.wallets.forEach(function(item){
                const wallet = {
                    endDate: item.walletId.endDate,
                    startDate: item.walletId.startDate,
                    walletName: item.walletId.title,
                    walletId: item.walletId._id,
                    isFavourite: item.walletId.isFavourite

                }
                fetchedWallets.push(wallet)
            });
            dispatch(fetchWalletsSuccess(fetchedWallets));
        })
        // axios.get('/VirtualWallet.json')
        //     .then (response => {
        //         let fetchedWallets = [];
        //         for (var key in response.data) {
        //             if (response.data.hasOwnProperty(key)) {
        //                 fetchedWallets.push({...response.data[key], key: key})
        //             }
        //         }
        //         console.log(fetchedWallets)
        //         dispatch(fetchWalletsSuccess(fetchedWallets));
        //     })
        //     .catch(error => {
        //        dispatch(action.onInfoDialogOpen());
        //     });
    }
};

export const myWalletsUpdate = (walletId) => {
    return {
        type: actionTypes.MY_WALLETS_UPDATE,
        walletId: walletId
    }
}

export const onWalletRemove = (walletId) => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8080/wallet/' + walletId, {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Deleting a wallet failed!');
      }
      return res.json();
    })
    .then(resData => {
      console.log('success!!!!!!')
      console.log(resData);
      dispatch(myWalletsUpdate(walletId));
      dispatch(action.onInfoELementOpen('success', 'Portfel usunięty pomyślnie.'));
    })
    .catch(error => {
        dispatch(action.onInfoELementOpen('error', 'Błąd połączenia z serwerem. Portfel nie został usunięty.'));
        console.log(error);
    });
    
    // const removeFromWalletsBasicInfo = () => {
    //     return axios.delete('/VirtualWallet/' + walletKey + '.json');
    // }
    // const removeFromWalletsFullInfo = () => {
    //     return axios.delete('/Wallets/' + walletKey + '.json');
    // }

    // return (dispatch) => {
    //     Promise.all([removeFromWalletsBasicInfo(), removeFromWalletsFullInfo()])
    //     .then (response => {
    //         dispatch(myWalletsUpdate(walletKey));
    //         dispatch(action.onInfoELementOpen('success', 'Portfel usunięty pomyślnie.'));
    //     })
    //     .catch(error => {
    //         dispatch(action.onInfoELementOpen('error', 'Błąd połączenia z serwerem. Portfel nie został usunięty.'));
    //         console.log(error);
    //     });
    // }
  }
}

export const addToFavourites = (walletId) => {
    return {
        type: actionTypes.WALLET_FAVOURITES_ADD,
        walletId: walletId
    }
}

export const onAddToFavourites = (walletId) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/fav-wallets-add/' + walletId, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Adding wallet to favourites failed!');
            }
            return res.json();
        })
        .then(resData => {
            dispatch(addToFavourites(walletId));
            dispatch(action.onInfoELementOpen('success', 'Portfel zapisany do ulubionych'));
        })
        .catch(error => {
            dispatch(action.onInfoELementOpen('error', 'Błąd połączenia z serwerem. Portfel nie został usunięty.'));
            console.log(error);
        });
    }
}

export const removeFromFavourites = (walletId) => {
    return {
        type: actionTypes.WALLET_FAVOURITES_REMOVE,
        walletId: walletId
    }
}

export const onRemoveFromFavourites = (walletId) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8080/fav-wallets-remove/' + walletId, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + token
        }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Adding wallet to favourites failed!');
            }
            return res.json();
        })
        .then (response => {
            dispatch(removeFromFavourites(walletId));
            dispatch(action.onInfoELementOpen('success', 'Portfel usunięty z ulubionych'));
        })
        .catch(error => {
            dispatch(action.onInfoELementOpen('error', 'Błąd połączenia z serwerem. Portfel nie został usunięty do ulubionych.'));
            console.log(error);
        });
    }
}
