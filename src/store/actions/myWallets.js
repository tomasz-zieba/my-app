import * as actionTypes from './actionTypes';
import * as action from './index';

export const fetchWalletsSuccess = (fetchedWallets) => ({
  type: actionTypes.FETCH_WALLETS_SUCCESS,
  myWallets: fetchedWallets,
});

export const clearWallets = () => ({
  type: actionTypes.WALLETS_CLEAR,
});

export const onSendWalletsRequest = () => async (dispatch) => {
  dispatch(clearWallets());
  dispatch(action.onRequestSended());
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('https://virtual-wallet-tz.herokuapp.com/wallets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Wallets fetched failed!');
    }
    dispatch(action.onGetResponse());
    const resData = await res.json();
    const fetchedWallets = [];
    resData.wallets.forEach((item) => {
      const wallet = {
        endDate: item.walletId.endDate,
        startDate: item.walletId.startDate,
        walletName: item.walletId.title,
        // eslint-disable-next-line no-underscore-dangle
        walletId: item.walletId._id,
        isFavourite: item.walletId.isFavourite,

      };
      fetchedWallets.push(wallet);
    });
    dispatch(fetchWalletsSuccess(fetchedWallets.reverse()));
  } catch (err) {
    dispatch(action.onGetResponse());
    dispatch(action.onInfoDialogOpen(err.message));
  }
};

export const myWalletsUpdate = (walletId) => ({
  type: actionTypes.MY_WALLETS_UPDATE,
  walletId,
});

export const onWalletRemove = (walletId) => async (dispatch) => {
  dispatch(action.onRequestSended());
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`https://virtual-wallet-tz.herokuapp.com/wallet/${walletId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Deleting a wallet failed!');
    }
    dispatch(action.onGetResponse());
    dispatch(myWalletsUpdate(walletId));
    dispatch(action.onInfoELementOpen('success', 'Portfel usunięty pomyślnie.'));
  } catch (err) {
    dispatch(action.onGetResponse());
    dispatch(action.onInfoDialogOpen(err.message));
  }
};

export const addToFavourites = (walletId) => ({
  type: actionTypes.WALLET_FAVOURITES_ADD,
  walletId,
});

export const onAddToFavourites = (walletId) => async (dispatch) => {
  dispatch(action.onRequestSended());
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`https://virtual-wallet-tz.herokuapp.com/fav-wallets-add/${walletId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Adding wallet to favourites failed!');
    }
    dispatch(action.onGetResponse());
    dispatch(addToFavourites(walletId));
    dispatch(action.onInfoELementOpen('success', 'Portfel zapisany do ulubionych'));
  } catch (err) {
    dispatch(action.onGetResponse());
    dispatch(action.onInfoELementOpen('error', 'Błąd połączenia z serwerem. Portfel nie został usunięty.'));
  }
};

export const removeFromFavourites = (walletId) => ({
  type: actionTypes.WALLET_FAVOURITES_REMOVE,
  walletId,
});

export const onRemoveFromFavourites = (walletId) => async (dispatch) => {
  dispatch(action.onRequestSended());
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`https://virtual-wallet-tz.herokuapp.com/fav-wallets-remove/${walletId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Adding wallet to favourites failed!');
    }
    dispatch(action.onGetResponse());
    dispatch(removeFromFavourites(walletId));
    dispatch(action.onInfoELementOpen('success', 'Portfel usunięty z ulubionych'));
  } catch (err) {
    dispatch(action.onGetResponse());
    dispatch(action.onInfoELementOpen('error', 'Błąd połączenia z serwerem. Portfel nie został usunięty do ulubionych.'));
  }
};
