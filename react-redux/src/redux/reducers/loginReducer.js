import { login } from '../actions/actionTypes';

const loginReducer = (state = false, action) => {
  switch (action.type) {
    case login:
      return !state;

    default:
      return state;
  }
};

export default loginReducer;
