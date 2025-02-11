import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useContractRead, useContractWrite } from 'wagmi';

const App = () => {
  const [oracleAddress, setOracleAddress] = useState('');
  const [requestData, setRequestData] = useState('');
  const [oracleResponse, setOracleResponse] = useState<any>(null);

  const { data: latestData } = useContractRead({
    address: oracleAddress as `0x${string}`,
    abi: [], // Add oracle ABI here
    functionName: 'latestAnswer',
    watch: true,
  });

  const { write: requestData } = useContractWrite({
    address: oracleAddress as `0x${string}`,
    abi: [], // Add oracle ABI here
    functionName: 'requestData',
  });

  const handleRequest = async () => {
    try {
      await requestData();
    } catch (error) {
      console.error('Error requesting data:', error);
    }
  };

  return (
    <div className="app">
      <h1>Oracle Interaction</h1>
      <input
        type="text"
        value={oracleAddress}
        onChange={(e) => setOracleAddress(e.target.value)}
        placeholder="Enter Oracle Contract Address..."
        style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <button onClick={handleRequest}>Request Data</button>
      {latestData && (
        <div style={{ marginTop: '1rem' }}>
          <h2>Latest Oracle Response:</h2>
          <pre>{JSON.stringify(latestData, null, 2)}</pre>
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