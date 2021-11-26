import * as types from './actionTypes';
import initialState from './initialState';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case types.USER_LOGIN_SUCCESS:
      return { ...state, user: action.user, loading: false, error: null, userLoggedIn: true };
    case types.USER_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
