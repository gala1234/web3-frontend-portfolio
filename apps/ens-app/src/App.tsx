import React from 'react';
import { useState } from 'react';

interface ENSRecord {
  name: string;
  address: string;
  expiryDate?: Date;
}

const App: React.FC = () => {
  const [ensRecords, setEnsRecords] = useState<ENSRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchENSRecord = async (name: string) => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Implement ENS lookup logic
      // This will be implemented when we add web3 integration
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>ENS Lookup App</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div className="records">
        {ensRecords.map((record) => (
          <div key={record.name} className="record">
            <h3>{record.name}</h3>
            <p>Address: {record.address}</p>
            {record.expiryDate && (
              <p>Expires: {record.expiryDate.toLocaleDateString()}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;