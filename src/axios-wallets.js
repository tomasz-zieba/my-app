import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://virtual-wallet-12a21.firebaseio.com'
});

export default instance;