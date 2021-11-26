import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';
import transactionsReducer from './transactions/transactionsReducer';

const appReducer = combineReducers({
  authReducer,
  userReducer,
  transactionsReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOG_OUT_SUCCESS') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
