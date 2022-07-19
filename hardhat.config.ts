import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import dotenv from 'dotenv';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import '@nomiclabs/hardhat-waffle';

dotenv.config();

const RPC_URL = process.env.RPC_URL;
const ACCOUNT_ADDRESS = process.env.ACCOUNT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY || '';

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  defaultNetwork: 'hardhat',
  gasReporter: {
    enabled: true,
  },
  networks: {
    ganache: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 1337,
    },
  },
};

export default config;
