# Web3 Frontend Portfolio

A comprehensive monorepo containing various Web3 frontend projects and smart contracts. This repository showcases different aspects of Web3 development, from basic Ethereum address validation to complex smart contract interactions.

## Projects

- **Portfolio Website**: A React-based personal portfolio website
- **Ethereum Transaction Parser**: Parse and format raw Ethereum transaction data
- **Ethereum Address Validator**: Validate and format Ethereum addresses
- **Oracle Interaction**: UI for interacting with blockchain oracles
- **On-Chain Data Dashboard**: Dashboard displaying Ethereum blockchain metrics
- **NFT Watchlist**: Track and monitor NFT collections
- **Off-Chain Message Signer**: Sign and verify messages with Ethereum wallets
- **Staking Contract Interface**: UI for interacting with staking contracts
- **Event Monitor**: Real-time smart contract event monitoring
- **ENS Domain Marketplace**: Search and trade ENS domains
- **Simple Voting Contract**: Solidity voting contract implementation
- **CrowdFunding Contract**: Smart contract for crowdfunding campaigns
- **Lottery Contract**: Chainlink VRF-powered lottery contract
- **Smart Contract Unit Tests**: Test suite for Solidity contracts
- **Web3 Integration Tests**: End-to-end testing for DApp interactions

## Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Build all projects:
   ```bash
   yarn build
   ```

3. Run tests:
   ```bash
   yarn test
   ```

## Development

Each project is contained in its own workspace and can be developed independently. Navigate to a project directory and use standard yarn commands:

```bash
yarn workspace <project-name> <command>
```

## Technologies

- React
- TypeScript
- wagmi/viem
- Hardhat
- Solidity
- Web3 APIs (Etherscan, The Graph, OpenSea)
- Testing frameworks