import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';
import transactionsReducer from './transactions/transactionsReducer';

function rootReducer() {
  return combineReducers({
    authReducer,
    userReducer,
    transactionsReducer,
  });
}

export default rootReducer;
