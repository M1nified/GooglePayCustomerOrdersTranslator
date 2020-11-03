import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApiKey } from './apiKey/apiKeyComponent';
import { FileTable } from './filesTable/filesTableComponent';

function App() {
  const LS_API_KEY = 'API_KEY';
  const [apiKey, setApiKey] = useState(window.localStorage.getItem(LS_API_KEY));

  const onSetApiKey = (apiKey: string | null) => {
    if (apiKey) {
      window.localStorage.setItem(LS_API_KEY, apiKey);
    } else {
      window.localStorage.removeItem(LS_API_KEY);
    }
    setApiKey(apiKey);
  }

  return (
    <div className="App">
      {
        apiKey ? '' : <ApiKey apiKey={apiKey} onSetApiKey={onSetApiKey} />
      }
      <FileTable />
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
