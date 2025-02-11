import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useAccount, useSignMessage } from 'wagmi';

const App = () => {
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState('');
  const { address } = useAccount();

  const { signMessage } = useSignMessage({
    onSuccess(data) {
      setSignature(data);
    },
    onError(error) {
      console.error('Error signing message:', error);
    },
  });

  const handleSign = () => {
    if (!message) return;
    signMessage({ message });
  };

  return (
    <div className="app">
      <h1>Off-Chain Message Signer</h1>
      <div style={{ marginBottom: '2rem' }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message to sign..."
          rows={5}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <button onClick={handleSign}>Sign Message</button>
      </div>
      {address && (
        <div style={{ marginBottom: '1rem' }}>
          <h3>Connected Address:</h3>
          <code>{address}</code>
        </div>
      )}
      {signature && (
        <div>
          <h3>Signature:</h3>
          <code style={{ wordBreak: 'break-all' }}>{signature}</code>
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