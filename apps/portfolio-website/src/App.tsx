import React from 'react';
import EthereumTransactionParser from './components/EthereumTransactionParser';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Web3 Portfolio</h1>
      <div className="content">
        <EthereumTransactionParser />
      </div>
    </div>
  );
};

export default App;