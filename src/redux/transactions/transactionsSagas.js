import * as types from './actionTypes';
import { setTransaction as apiCreateTransaction } from '../../api/transactions';
import { getTransactions as apiGetTransaction } from '../../api/transactions';
import { getQuotes as apiGetQuotes } from '../../api/transactions';
import { put, all, takeLatest } from 'redux-saga/effects';

function* createTransactionSaga(data) {
  try {
    const response = yield apiCreateTransaction(data.userToken, data.transaction);
    if (response.status === 'OK') {
      yield put({
        type: types.USER_CREATE_TRANSACTION_SUCCESS,
        createdTransaction: response.result.data,
      });
    } else {
      yield put({ type: types.USER_CREATE_TRANSACTION_FAILURE, error: response });
    }
  } catch (error) {
    yield put({ type: types.USER_CREATE_TRANSACTION_FAILURE, error: error.data.errors });
  }
}

function* getTransactionSaga(data) {
  try {
    const response = yield apiGetTransaction(data.userToken, data.params);
    if (response.status === 'OK') {
      yield put({
        type: types.USER_GET_TRANSACTION_SUCCESS,
        userTransactions: response.result.data,
        pagination: response.result.pagination,
      });
    } else {
      yield put({ type: types.USER_GET_TRANSACTION_FAILURE, error: response });
    }
  } catch (error) {
    yield put({ type: types.USER_GET_TRANSACTION_FAILURE, error: error.data.errors });
  }
}

function* getQuotesSaga(data) {
  try {
    const response = yield apiGetQuotes(data.userToken);
    if (response.status === 'OK') {
      yield put({
        type: types.GET_QUOTES_SUCCESS,
        quotes: response.result.data,
      });
    } else {
      yield put({ type: types.GET_QUOTES_FAILURE, error: response });
    }
  } catch (error) {
    yield put({ type: types.GET_QUOTES_FAILURE, error: error.data.errors });
  }
}

export function* watchNewTransaction() {
  yield all([yield takeLatest(types.USER_CREATE_TRANSACTION_REQUEST, createTransactionSaga)]);
}

export function* watchGetTransaction() {
  yield all([
    yield takeLatest(types.USER_GET_TRANSACTION_REQUEST, getTransactionSaga),
    yield takeLatest(types.GET_QUOTES_REQUEST, getQuotesSaga),
  ]);
}
