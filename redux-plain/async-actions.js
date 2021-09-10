const redux = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');
const reduxLogger = require('redux-logger');

const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();
const initialState = {
  loading: false,
  users: [],
  error: '',
};

// action types
const fetchUserRequest = 'FETCH_USER_REQUEST';
const fetchUserSuccess = 'FETCH_USER_SUCCESS';
const fetchUserFailure = 'FETCH_USER_FAILURE';

// action-creators
const fetchUsersRequest = () => {
  return {
    type: fetchUserRequest,
  };
};
const fetchUsersSuccess = (users) => {
  return {
    type: fetchUserSuccess,
    payload: users,
  };
};
const fetchUsersFailure = (error) => {
  return {
    type: fetchUserFailure,
    payload: error,
  };
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchUserRequest:
      return {
        ...state,
        loading: true,
      };
    case fetchUserSuccess:
      return {
        loading: false,
        users: action.payload,
        error: '',
      };
    case fetchUserFailure:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// async action creater
// regular action creators returns an action which is plain js object
// but thunk allows us to create an action creator which would return a function instead of just plain JS object
// this returned function doesn't have to be pure, so it is allowed to have side effects such as async api calls
// ** this function can also dispatch actions (like we have seen with store.dispatch(increment()))
// ** - this is made possible as it recieves a dispatch method as its arguments

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        // res.data is the array of users
        // const users = res.data.map((user) => user.id);
        const users = res.data.map((user) => {
          return { id: user.id, name: user.name };
        });

        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        // err.message is the error description
        dispatch(fetchUsersFailure(err.message));
      });
  };
};

const store = redux.createStore(
  reducer,
  applyMiddleware(thunkMiddleware, logger)
);
// store.subscribe(() => console.log(store.getState()));
store.subscribe(() => {});
store.dispatch(fetchUsers());
