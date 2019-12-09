import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import thunk from 'redux-thunk';
import myWallets from './store/reducers/myWallets';
import wallet from './store/reducers/wallet';
import settings from './store/reducers/settings';
import theme from './theme';

import App from "./App";

const rootReducer = combineReducers({
    myWallets: myWallets,
    wallet: wallet,
    settings: settings
});

const logger = store => {
    return next => {
        return action => {
            const result = next(action);
            return result;
        };
    };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
    <div>
        <ThemeProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
        </ThemeProvider>
    </div>,
    document.getElementById("root")
)