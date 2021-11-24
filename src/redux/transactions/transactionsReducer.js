import * as types from './actionTypes';
import initialState from './initialState';

export default function transactionsReducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_CREATE_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case types.USER_CREATE_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        createdTransaction: action.createdTransaction,
      };
    case types.USER_CREATE_TRANSACTION_FAILURE:
      return { ...state, loading: false, error: action.error };
    case types.USER_GET_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case types.USER_GET_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userTransactions: action.userTransactions,
        pagination: action.pagination,
      };
    case types.USER_GET_TRANSACTION_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
