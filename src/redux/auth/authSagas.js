import * as types from './actionTypes';
import { loginUser as apiLoginUser } from '../../api/lib/users';
import { put, all, takeLatest } from 'redux-saga/effects';
import { useNavigate } from 'react-router-dom';

function* loginUserSaga(data) {
  //const navigate = useNavigate();
  try {
    const response = yield apiLoginUser(data.user);
    if (response.status === 'OK') {
      localStorage.setItem('userToken', response.result.data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      yield put({ type: types.USER_LOGIN_SUCCESS, user: response.result.data });
    } else {
      yield put({ type: types.USER_LOGIN_FAILURE, error: response });
    }
  } catch (error) {
    yield put({ type: types.USER_LOGIN_FAILURE, error: error.data.errors });
  }
}

function* getUserSaga(data) {
  //const navigate = useNavigate();
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

export function* watchAuth() {
  yield all([
    yield takeLatest(types.USER_LOGIN_REQUEST, loginUserSaga),
    yield takeLatest(types.GET_USER_REQUEST, getUserSaga),
  ]);
}
