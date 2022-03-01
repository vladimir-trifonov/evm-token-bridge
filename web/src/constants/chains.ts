import { IChainData } from '../types'

export const baseChainsIds = [1, 3, 31337]
export const sideChainsIds = [56, 97, 1338]

const supportedChains: IChainData[] = [
  {
    name: 'Ethereum Mainnet',
    short_name: 'eth',
    chain: 'ETH',
    network: 'mainnet',
    chain_id: 1,
    network_id: 1,
    rpc_url: 'https://mainnet.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Ethereum Ropsten',
    short_name: 'rop',
    chain: 'ETH',
    network: 'ropsten',
    chain_id: 3,
    network_id: 3,
    rpc_url: 'https://ropsten.infura.io/v3/%API_KEY%',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Binance Smart Chain',
    short_name: 'bnb',
    chain: 'BSC',
    network: 'mainnet',
    chain_id: 56,
    network_id: 56,
    rpc_url: 'https://bsc-dataseed1.defibit.io/',
    native_currency: {
      symbol: 'BNB',
      name: 'BNB',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Binance Chain Testnet',
    short_name: 'bnbt',
    chain: 'BSC',
    network: 'chapel',
    chain_id: 97,
    network_id: 97,
    rpc_url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    native_currency: {
      symbol: 'tBNB',
      name: 'BNB',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Hardhat Localhost 1',
    short_name: 'hhl',
    chain: 'ETH',
    network: 'mainchain',
    chain_id: 31337,
    network_id: 31337,
    rpc_url: 'http://localhost:8545/',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
  {
    name: 'Hardhat Localhost 2',
    short_name: 'hhl',
    chain: 'ETH',
    network: 'hardhat',
    chain_id: 1338,
    network_id: 1338,
    rpc_url: 'http://localhost:8545/',
    native_currency: {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: '18',
      contractAddress: '',
      balance: '',
    },
  },
]

export default supportedChains
