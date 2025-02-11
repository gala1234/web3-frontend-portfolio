"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const viem_1 = require("viem");
const App = () => {
    const [address, setAddress] = (0, react_1.useState)('');
    const [isValid, setIsValid] = (0, react_1.useState)(null);
    const [checksummed, setChecksummed] = (0, react_1.useState)('');
    const handleValidate = () => {
        try {
            const valid = (0, viem_1.isAddress)(address);
            setIsValid(valid);
            if (valid) {
                const checksummedAddress = (0, viem_1.getAddress)(address);
                setChecksummed(checksummedAddress);
            }
            else {
                setChecksummed('');
            }
        }
        catch (error) {
            console.error('Error validating address:', error);
            setIsValid(false);
            setChecksummed('');
        }
    };
    return (<div className="app">
      <h1>Ethereum Address Validator</h1>
      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Ethereum address..." style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}/>
      <button onClick={handleValidate}>Validate Address</button>
      {isValid !== null && (<div style={{ marginTop: '1rem' }}>
          <p>Status: {isValid ? '✅ Valid' : '❌ Invalid'}</p>
          {checksummed && (<p>Checksummed: <code>{checksummed}</code></p>)}
        </div>)}
    </div>);
};
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(<react_1.default.StrictMode>
    <App />
  </react_1.default.StrictMode>);
