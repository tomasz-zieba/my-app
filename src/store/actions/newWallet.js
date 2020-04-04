/* eslint-disable import/prefer-default-export */
import * as action from './index';

export const onFetchNewWallet = (walletData) => async (dispatch) => {
  dispatch(action.onRequestSended());
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('https://virtual-wallet-tz.herokuapp.com/new-wallet', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: walletData.walletName,
        startDate: walletData.startDate,
        endDate: walletData.endDate,
        creator: userId,
      }),
    });
    if (res.status === 422) {
      throw new Error('Nazwa portfela nie może być pusta.');
    }
    if (res.status !== 200 && res.status !== 201) {
      throw new Error('Nie udało się utworzyć portfela.');
    }
    dispatch(action.onGetResponse());
    dispatch(action.onInfoELementOpen('success', 'Portfel zapisany pomyślnie'));
  } catch (error) {
    dispatch(action.onGetResponse());
    dispatch(action.onInfoELementOpen('error', error.message));
  }
};
