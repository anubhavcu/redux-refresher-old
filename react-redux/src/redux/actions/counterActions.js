import { increment, decrement } from './actionTypes';

export const incrementCounter = (number = 1) => {
  return {
    type: increment,
    payload: number,
  };
};
export const decrementCounter = (number = 1) => {
  return {
    type: decrement,
    payload: number,
  };
};
