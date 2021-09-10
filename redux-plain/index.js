const redux = require('redux');
const reduxLogger = require('redux-logger');

const logger = reduxLogger.createLogger();
const applyMiddleware = redux.applyMiddleware;

const initialState = {
  counter: 0,
  login: false,
};
// action-creators (action creators return an action)
// action is just a plain JS object with type and optional payload or any other relevant info about the event (action)
const increment = (number) => {
  return {
    type: 'increment',
    payload: number,
  };
};
const decrement = (number) => {
  return {
    type: 'decrement',
    payload: number,
  };
};

const login = () => {
  return {
    type: 'login',
  };
};

// reducers
// function which takes state and action as arguments and returns the next state of the app based on action
const counterReducer = (state = initialState.counter, { type, payload }) => {
  switch (type) {
    case 'increment':
      return state + payload;
    case 'decrement':
      //       return state - payload;
      return state - payload;
    default:
      return state;
  }
};

// login reducer
const loginReducer = (state = initialState.login, action) => {
  switch (action.type) {
    case 'login':
      return !state;
    default:
      return state;
  }
};

// combine reducers
// redux.createStore can take only one reducer as a parameter, so we need to combine if we have multiple reducers
const rootReducer = redux.combineReducers({
  counter: counterReducer,
  isLogin: loginReducer,
});

// store
// second argument in createStore method is for middlewares (if any used )
const store = redux.createStore(rootReducer, applyMiddleware(logger));

// app is subscribed to the store, and a listener function is passed as an argument
// this listener function will execute everytime when the state changes as our app is subscribed now to the store
// * eg : const unsubscribe = store.subscribe(() => console.log(store.getState()))
// * subscribe method returns a function which if called later on can unsubscribe our app from the store
const unsubscribe = store.subscribe(() => {});

console.log('initial state : ', store.getState());

// dispatching actions
store.dispatch(increment(19));
store.dispatch(increment(2));
store.dispatch(decrement(5));
store.dispatch(login());
store.dispatch(login());
store.dispatch(login());
unsubscribe(); // app is unsubscibed to the store

store.dispatch(increment(7));

/**
 * Middlewares: helps extending redux with custom functionality
 * provides a third party extension point between dispatching an action and the moment it reaches the reducer
 * general uses of middleware are for loggin(redux-logger), crash-reporting, async-operations(thunk, see async-actions.js)
 * * to use middleware just call redux.applyMiddleware(middleware_name) and pass it to the createStore method.
 */
