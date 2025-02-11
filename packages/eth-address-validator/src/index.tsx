import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { isAddress, getAddress } from 'viem';

const App = () => {
  const [address, setAddress] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [checksummed, setChecksummed] = useState<string>('');

  const handleValidate = () => {
    try {
      const valid = isAddress(address);
      setIsValid(valid);
      if (valid) {
        const checksummedAddress = getAddress(address);
        setChecksummed(checksummedAddress);
      } else {
        setChecksummed('');
      }
    } catch (error) {
      console.error('Error validating address:', error);
      setIsValid(false);
      setChecksummed('');
    }
  };

  return (
    <div className="app">
      <h1>Ethereum Address Validator</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Ethereum address..."
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <button onClick={handleValidate}>Validate Address</button>
      {isValid !== null && (
        <div style={{ marginTop: '1rem' }}>
          <p>Status: {isValid ? '✅ Valid' : '❌ Invalid'}</p>
          {checksummed && (
            <p>Checksummed: <code>{checksummed}</code></p>
          )}
        </div>
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