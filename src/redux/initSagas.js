import { all } from '@redux-saga/core/effects';
import sagas from './sagas';

function* sagasToRun() {
  yield all([...sagas]);
}

const initSagas = (store, sagaMiddleware) => {
  sagaMiddleware.run((...args) => sagasToRun(store, ...args));
};

export default initSagas;
