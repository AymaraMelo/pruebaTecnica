import * as types from './actionTypes';

export const createTransaction = (userToken, transaction) => ({
  type: types.USER_CREATE_TRANSACTION_REQUEST,
  userToken,
  transaction,
});

export const getTransactions = (userToken, params) => ({
  type: types.USER_GET_TRANSACTION_REQUEST,
  userToken,
  params,
});
