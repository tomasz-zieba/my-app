/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import { ThemeProvider } from '@material-ui/styles';

import myWallets from './store/reducers/myWallets';
import wallet from './store/reducers/wallet';
import settings from './store/reducers/settings';
import auth from './store/reducers/auth';
import theme from './theme';


import App from './App';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  myWallets,
  wallet,
  settings,
  auth,
});

const history = createBrowserHistory();

const logger = (store) => (next) => (action) => {
  const result = next(action);
  return result;
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        logger,
        thunk,
      ),
    ),
  );
  return store;
}

const store = configureStore();

ReactDOM.render(
  <div>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </ThemeProvider>
  </div>,
  document.getElementById('root'),
);
