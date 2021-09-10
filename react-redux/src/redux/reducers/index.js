import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  isLogin: loginReducer,
});

export default rootReducer;
