import React, { useState } from 'react';
import './App.css';

const CounterApp = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);
  const reset = () => setCounter(0);

  return (
    <div className="counter-container">
      <h1>Simple Counter App</h1>
      <p className="counter-value">Counter Value: {counter}</p>
      <div className="button-group">
        <button className="btn increment" onClick={increment}>Increment</button>
        <button className="btn decrement" onClick={decrement}>Decrement</button>
        <button className="btn reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default CounterApp;
