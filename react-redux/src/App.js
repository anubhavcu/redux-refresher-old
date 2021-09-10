import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import './App.css';
import {
  incrementCounter,
  decrementCounter,
} from './redux/actions/counterActions';
import { loginAction } from './redux/actions/loginAction';
const App = () => {
  const [value, setValue] = useState(1);
  const counter = useSelector((state) => state.counter);
  const isLogin = useSelector((state) => state.isLogin);
  const dispatch = useDispatch();
  return (
    <div className='App'>
      <button onClick={() => dispatch(decrementCounter())}>-</button>
      <span>Counter : {counter}</span>
      <button onClick={() => dispatch(incrementCounter())}>+</button>

      <div>
        <button onClick={() => dispatch(loginAction())}>toggle Login</button>
        <span>{isLogin ? 'YES' : 'NO'}</span>

        <button onClick={() => dispatch(incrementCounter(value))}>
          increment by {value}
        </button>
        <input
          type='number'
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value))}
        />

        {isLogin && <h2>some sensitive data ! </h2>}
      </div>
    </div>
  );
};

export default App;
