import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
//import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import initSagas from './initSagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer(),
  composeEnhancers(applyMiddleware(sagaMiddleware, reduxImmutableStateInvariant())),
);

initSagas(store, sagaMiddleware);

export default store;
