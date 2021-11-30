import * as types from './actionTypes';
import { USER_LOGIN_SUCCESS } from '../auth/actionTypes';
import { getUserAccounts as apigetAccounts } from '../../api/users';
import { createUser as apicreateUser } from '../../api/users';
import { put, all, takeLatest } from 'redux-saga/effects';

function* getAccountsSaga(data) {
  try {
    const response = yield apigetAccounts(data.userToken);
    if (response.status === 'OK') {
      yield put({ type: types.USER_ACCOUNT_SUCCESS, userAccounts: response.result.data });
    } else {
      yield put({ type: types.USER_ACCOUNT_FAILURE, error: response });
    }
  } catch (error) {
    yield put({ type: types.USER_ACCOUNT_FAILURE, error: error.data.errors });
  }
}

function* createUserSaga(data) {
  try {
    const response = yield apicreateUser(data.newUser);
    if (response.status === 'OK') {
      localStorage.setItem('userToken', response.result.data.token);
      yield put({ type: types.CREATE_USER_ACCOUNT_SUCCESS });
      yield put({ type: USER_LOGIN_SUCCESS, user: response.result.data });
    } else {
      yield put({ type: types.CREATE_USER_ACCOUNT_FAILURE, error: response });
    }
  } catch (error) {
    yield put({ type: types.CREATE_USER_ACCOUNT_FAILURE, error: error.data.errors });
  }
}

export function* watchUser() {
  yield all([
    yield takeLatest(types.USER_ACCOUNT_REQUEST, getAccountsSaga),
    yield takeLatest(types.CREATE_USER_ACCOUNT_REQUEST, createUserSaga),
  ]);
}
