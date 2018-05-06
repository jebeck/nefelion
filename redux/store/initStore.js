import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger as createLoggingMiddleware } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootSaga from 'sagas/rootSaga';
import reducers from 'reducers';
import initialState from 'store/initialState';

let composeEnhancers = compose;
if (typeof window !== 'undefined') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const loggingMiddleware = createLoggingMiddleware({ collapsed: true });
const sagaMiddleware = createSagaMiddleware();

let store = null;

function configureStore(state) {
  store = createStore(
    reducers,
    state,
    process.env.NODE_ENV === 'production'
      ? composeEnhancers(applyMiddleware(sagaMiddleware))
      : composeEnhancers(applyMiddleware(sagaMiddleware, loggingMiddleware))
  );
  return store;
}

export default function initStore(isServer, state = initialState) {
  if (isServer && typeof window === 'undefined') {
    return configureStore(state);
  }
  if (!store) {
    store = configureStore(state);
    sagaMiddleware.run(rootSaga);
  }

  return store;
}
