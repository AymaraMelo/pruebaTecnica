import * as types from './actionTypes';

export function loginUser(user) {
  return { type: types.USER_LOGIN, user };
}
