import * as types from './actionTypes';
import { loginUser as apiLoginUser } from '../../api/lib/users';
import { getUser as apiGetUser } from '../../api/lib/users';
import { put, all, takeLatest } from 'redux-saga/effects';

function* loginUserSaga(data) {
  try {
    const response = yield apiLoginUser(data.user);
    if (response.status === 'OK') {
      localStorage.setItem('userToken', response.result.data.token);
      yield put({ type: types.USER_LOGIN_SUCCESS, user: response.result.data });
    } else {
      yield put({ type: types.USER_LOGIN_FAILURE, error: response });
    }
  } catch (error) {
    yield put({ type: types.USER_LOGIN_FAILURE, error: error.data.errors });
  }
}

function* logoutSaga() {
  // localStorage.removeItem('userToken');
  yield put({ type: types.USER_LOG_OUT_SUCCESS });
}

function* getUserSaga(data) {
  try {
    const response = yield apiGetUser(data.userToken);
    if (response.status === 'OK') {
      yield put({ type: types.USER_LOGIN_SUCCESS, user: response.result.data });
    } else {
      yield put({ type: types.USER_LOGIN_FAILURE, error: response });
    }
  } catch (error) {
    yield put({ type: types.USER_LOGIN_FAILURE, error: error.data.errors });
  }
}

export function* watchAuth() {
  yield all([
    yield takeLatest(types.USER_LOGIN_REQUEST, loginUserSaga),
    yield takeLatest(types.GET_USER_REQUEST, getUserSaga),
    yield takeLatest(types.USER_LOG_OUT, logoutSaga),
  ]);
}
