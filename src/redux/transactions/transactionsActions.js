import * as types from './actionTypes';
//import { loginUser as apiLoginUser } from '../../api/lib/users';

export const createTransaction = (userToken, transaction) => ({
  type: types.USER_CREATE_TRANSACTION_REQUEST,
  userToken,
  transaction,
});

export const getTransactions = (userToken) => ({
  type: types.USER_GET_TRANSACTION_REQUEST,
  userToken,
});
