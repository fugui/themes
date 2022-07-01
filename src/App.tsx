import React from 'react';
import logo from './logo.svg';
import {Button} from 'antd';
import './App.less';
import less from 'less';

/**
 * Default App
 * @return {ReactNode} render
 */
function App() {
  const handleClick = (e: any) => {
    less.modifyVars({
    });
  };

  return (
    <div className="App">
      <Button type='primary' onClick={handleClick}>Click Me!</Button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
