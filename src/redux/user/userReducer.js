import * as types from './actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_ACCOUNT_REQUEST:
      return { ...state, loading: true };
    case types.USER_ACCOUNT_SUCCESS:
      return { ...state, userAccounts: action.userAccounts, loading: false, error: null };
    case types.USER_ACCOUNT_FAILURE:
      return { ...state, loading: false, error: action.error };
    case types.CREATE_USER_ACCOUNT_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_USER_ACCOUNT_SUCCESS:
      return { ...state, loading: false, error: null };
    case types.CREATE_USER_ACCOUNT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
