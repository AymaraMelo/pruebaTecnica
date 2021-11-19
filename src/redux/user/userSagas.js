import * as types from './actionTypes';
import { getUserAccounts as apigetAccounts } from '../../api/lib/users';
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

export function* watchUser() {
  yield all([yield takeLatest(types.USER_ACCOUNT_REQUEST, getAccountsSaga)]);
}
