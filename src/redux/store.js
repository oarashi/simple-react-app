import { createStore, applyMiddleware, compose as simpleCompose } from 'redux';

import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import makeApiCall from 'utils/apiRequest';
import rootReducer from './reducers';
import rootSaga from './sagas';
import apiMiddleware from './apiMiddleware';

const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(
  apiMiddleware(makeApiCall),
  sagaMiddleware,
  createLogger({
    collapsed: true,
  }),
);

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || simpleCompose;

const getStore = (initialState = {}) => {
  const store = createStore(rootReducer, initialState, compose(middleware));

  sagaMiddleware.run(rootSaga);

  return store;
};

export default getStore;
