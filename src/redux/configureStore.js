import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
//import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import initSagas from './initSagas';
import { getUser } from './auth/authActions';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware, reduxImmutableStateInvariant())),
);

initSagas(store, sagaMiddleware);

const userToken = localStorage.getItem('userToken');
if (userToken) store.dispatch(getUser(userToken));

export default store;
