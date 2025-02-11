import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <div className="app">
      <h1>Web3 Portfolio</h1>
      <p>Welcome to my Web3 development portfolio!</p>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);