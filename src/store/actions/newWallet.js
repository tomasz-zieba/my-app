import axios from '../../axios-wallets';
import * as action from './index';


export const onFetchNewWallet = (walletData) => {
    return (dispatch) => {
        axios.post('/VirtualWallet.json', walletData)
            .then (response => {
                dispatch(action.onInfoELementOpen('success', 'Portfel zapisany pomyślnie.'));
            })
            .catch(error => {
                // console.log(error);
                dispatch(action.onInfoELementOpen('error', 'Błąd połączenia z serwerem. Portfel nie został zapisany.'));
            });
    }
};