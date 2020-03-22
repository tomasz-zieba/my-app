import * as action from './index';

export const onFetchNewWallet = (walletData) => {
    return (dispatch) => {
        dispatch(action.onRequestSended());
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        fetch('https://virtual-wallet-tz.herokuapp.com/new-wallet', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
            body: JSON.stringify({
                title: walletData.walletName,
                startDate: walletData.startDate,
                endDate: walletData.endDate,
                creator: userId
            })
        })
        .then(res => {
            dispatch(action.onGetResponse());
            if (res.status === 422) {
                throw new Error("Nazwa portfela nie może być pusta.");
            }
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Nie udało się utworzyć portfela.');
            }
            return res.json();
        })
        .then( resData => {
            dispatch(action.onInfoELementOpen('success', 'Portfel zapisany pomyślnie'));
        })
        .catch(error => {
            dispatch(action.onInfoELementOpen('error', error.message));
        });
    }
};