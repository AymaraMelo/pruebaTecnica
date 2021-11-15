import * as types from '../actions/actionTypes';

export default function userReducer(state = null, action) {
  switch (action.type) {
    case types.USER_LOGIN:
      return [action.user];
    default:
      return state;
  }
}
