import React, { useState } from 'react';
import { parseTransaction } from 'eth-transaction-parser';

interface ParsedTransaction {
  from: string;
  to: string;
  value: string;
  data: string;
  nonce: number;
  gasPrice: string;
  gasLimit: string;
}

const EthereumTransactionParser: React.FC = () => {
  const [rawTransaction, setRawTransaction] = useState('');
  const [parsedTransaction, setParsedTransaction] = useState<ParsedTransaction | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleParse = () => {
    try {
      const result = parseTransaction(rawTransaction);
      setParsedTransaction(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse transaction');
      setParsedTransaction(null);
    }
  };

  return (
    <div className="transaction-parser">
      <h2>Ethereum Transaction Parser</h2>
      <div className="input-section">
        <textarea
          value={rawTransaction}
          onChange={(e) => setRawTransaction(e.target.value)}
          placeholder="Paste raw Ethereum transaction here..."
          rows={4}
          className="transaction-input"
        />
        <button onClick={handleParse} className="parse-button">
          Parse Transaction
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {parsedTransaction && (
        <div className="parsed-result">
          <h3>Parsed Transaction Details</h3>
          <div className="transaction-details">
            <p><strong>From:</strong> {parsedTransaction.from}</p>
            <p><strong>To:</strong> {parsedTransaction.to}</p>
            <p><strong>Value:</strong> {parsedTransaction.value}</p>
            <p><strong>Nonce:</strong> {parsedTransaction.nonce}</p>
            <p><strong>Gas Price:</strong> {parsedTransaction.gasPrice}</p>
            <p><strong>Gas Limit:</strong> {parsedTransaction.gasLimit}</p>
            <p><strong>Data:</strong> {parsedTransaction.data}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EthereumTransactionParser;