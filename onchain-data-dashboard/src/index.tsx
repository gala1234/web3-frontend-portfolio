import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http()
});

const App = () => {
  const [blockData, setBlockData] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlockData = async () => {
      try {
        const latestBlock = await publicClient.getBlockNumber();
        const blocks = [];

        for (let i = 0; i < 10; i++) {
          const block = await publicClient.getBlock({
            blockNumber: latestBlock - BigInt(i)
          });
          blocks.push({
            number: Number(block.number),
            gasUsed: Number(block.gasUsed),
            timestamp: new Date(Number(block.timestamp) * 1000).toLocaleTimeString(),
          });
        }

        setBlockData(blocks.reverse());
      } catch (error) {
        console.error('Error fetching block data:', error);
      }
    };

    fetchBlockData();
    const interval = setInterval(fetchBlockData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <h1>Ethereum Network Dashboard</h1>
      <div style={{ marginTop: '2rem' }}>
        <h2>Gas Usage by Block</h2>
        <LineChart width={800} height={400} data={blockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="gasUsed" stroke="#8884d8" />
        </LineChart>
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