import * as actionTypes from './actionTypes';
import { push } from 'connected-react-router'

const onLoginSuccess = (token, userId) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
        userId: userId
    }
}

const onAuthFail = () => {
    return {
        type: actionTypes.AUTH_FAIL,
    }
}

export const authLogin = (event, authData) => {
    return (dispatch) => {
        event.preventDefault();
        fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: authData.name,
            password: authData.password,
        })
        })
        .then(res => {
            if (res.status === 422) {
            throw new Error('Validation failed.');
            }
            if (res.status !== 200 && res.status !== 201) {
            console.log('Error!');
            throw new Error('Could not authenticate you!');
            }
            return res.json();
        })
        .then(resData => {
            localStorage.setItem('token', resData.token);
            localStorage.setItem('userId', resData.userId);
            const remainingMilliseconds = 60 * 60 * 1000;
            const expiryDate = new Date(
            new Date().getTime() + remainingMilliseconds
            );
            localStorage.setItem('expiryDate', expiryDate.toISOString());
            checkAuthTimeout(remainingMilliseconds);
            dispatch(onLoginSuccess(resData.token, resData.userId));
        })
        .catch(err => {
            console.log(err);
            dispatch(onAuthFail());
        });
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};


export const authSignup = (event, authData) => {
    return (dispatch) => {
        event.preventDefault();
        fetch('http://localhost:8080/auth/signup',  {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: authData.password,
                name: authData.name
            })
        })
        .then(res => {
            if (res.status === 422) {
            throw new Error(
                "Validation failed. Make sure the email address isn't used yet!"
            );
            }
            if (res.status !== 200 && res.status !== 201) {
            console.log('Error!');
            throw new Error('Creating a user failed!');
            }
            return res.json();
        })
        .then(resData => {
            onAuthFail();
            dispatch(push('/login'))
        })
        .catch(err => console.log(err))
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expiryDate'));
            if (expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(onLoginSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
};