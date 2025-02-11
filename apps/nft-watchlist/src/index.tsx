import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { OpenSeaSDK } from "opensea-js";
import { ReservoirSDK } from '@reservoir0x/sdk';

const App = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [nftData, setNftData] = useState<any>(null);

  const handleAddToWatchlist = async () => {
    try {
      // Fetch NFT data from OpenSea/Reservoir
      // Implementation will require API keys and proper SDK setup
      const nft = {
        contractAddress,
        tokenId,
        timestamp: new Date().toISOString()
      };
      setWatchlist([...watchlist, nft]);
      setContractAddress('');
      setTokenId('');
    } catch (error) {
      console.error('Error adding NFT:', error);
    }
  };

  return (
    <div className="app">
      <h1>NFT Watchlist</h1>
      <div style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
          placeholder="NFT Contract Address"
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          placeholder="Token ID"
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <button onClick={handleAddToWatchlist}>Add to Watchlist</button>
      </div>
      <div>
        <h2>Your Watchlist</h2>
        {watchlist.map((nft, index) => (
          <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
            <p>Contract: {nft.contractAddress}</p>
            <p>Token ID: {nft.tokenId}</p>
            <p>Added: {new Date(nft.timestamp).toLocaleString()}</p>
          </div>
        ))}
      </div>
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