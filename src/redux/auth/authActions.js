import * as types from './actionTypes';
//import { loginUser as apiLoginUser } from '../../api/lib/users';

export const loginUser = (user) => ({ type: types.USER_LOGIN_REQUEST, user });

export const getUser = (user) => ({ type: types.GET_USER_REQUEST, user });
