# Web3 Frontend Portfolio

A comprehensive monorepo containing various Web3 frontend projects and smart contracts. This repository showcases different aspects of Web3 development, from basic Ethereum address validation to complex smart contract interactions.

## Projects

- **Portfolio Website**: A React-based personal portfolio website
- **Ethereum Transaction Parser**: Parse and format raw Ethereum transaction data
- **Ethereum Address Validator**: Validate and format Ethereum addresses
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

This project requires Node.js version 20 or higher. It is highly recommended to use Node Version Manager (nvm) to manage Node.js versions.

1. Install nvm (if not already installed):
   * macOS/Linux:
       ```bash
       curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
       ```
       or
       ```bash
       wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
       ```
   * Windows: Follow the instructions at [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)

2. Use nvm to install Node.js 20:
    ```bash
    nvm install 20
    ```

3. Use nvm to select Node.js 20:
    ```bash
    nvm use 20
    ```

    Note: The `.nvmrc` file in the root of this repository automatically specifies the required Node.js version when using `nvm use`.

4. Install dependencies:
    ```bash
    yarn install
    ```

5. Build all projects:
    ```bash
    yarn build
    ```

6. Run tests:
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