import * as types from './actionTypes';
//import { loginUser as apiLoginUser } from '../../api/lib/users';

export const getAccounts = (userToken) => ({ type: types.USER_ACCOUNT_REQUEST, userToken });
