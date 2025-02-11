import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { parseTransaction } from 'viem';

const App = () => {
  const [rawTx, setRawTx] = useState('');
  const [parsedTx, setParsedTx] = useState<any>(null);

  const handleParse = async () => {
    try {
      const parsed = await parseTransaction(rawTx as `0x${string}`);
      setParsedTx(parsed);
    } catch (error) {
      console.error('Error parsing transaction:', error);
      setParsedTx(null);
    }
  };

  return (
    <div className="app">
      <h1>Ethereum Transaction Parser</h1>
      <textarea
        value={rawTx}
        onChange={(e) => setRawTx(e.target.value)}
        placeholder="Enter raw transaction data..."
        rows={5}
        style={{ width: '100%', marginBottom: '1rem' }}
      />
      <button onClick={handleParse}>Parse Transaction</button>
      {parsedTx && (
        <pre style={{ marginTop: '1rem' }}>
          {JSON.stringify(parsedTx, null, 2)}
        </pre>
      )}
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