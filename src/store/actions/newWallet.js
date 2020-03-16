import axios from '../../axios-wallets';
import * as action from './index';

export const onFetchNewWallet = (walletData) => {
    console.log('walletData');
    console.log(walletData);

    return (dispatch) => {
        axios.post('/VirtualWallet.json', walletData)
            .then (response => {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                fetch('http://localhost:8080/new-wallet', {
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
                dispatch(action.onInfoELementOpen('success', 'Portfel zapisany pomyślnie.'));
            })
            .catch(error => {
                // console.log(error);
                dispatch(action.onInfoELementOpen('error', 'Błąd połączenia z serwerem. Portfel nie został zapisany.'));
            });
    }
};