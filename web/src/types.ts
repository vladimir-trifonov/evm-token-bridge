export interface IAssetData {
    symbol: string
    name: string
    decimals: string
    contractAddress: string
    balance?: string
  }
  
  export interface IChainData {
    name: string
    short_name: string
    chain: string
    network: string
    chain_id: number
    network_id: number
    rpc_url: string
    native_currency: IAssetData
  }

  export type StateType = {
    providerFrom?: any
    web3ProviderFrom?: any
    web3ProviderTo?: any
    fromAddress?: string
    toAddress?: string
    chainId?: number
  }
  
  export type ActionType =
    | {
      type: "SET_WEB3_PROVIDER_FROM"
      providerFrom?: StateType["providerFrom"]
      web3ProviderFrom?: StateType["web3ProviderFrom"]
      web3ProviderTo?: StateType["web3ProviderTo"]
      fromAddress?: StateType["fromAddress"]
      toAddress?: StateType["toAddress"]
      chainId?: StateType["chainId"]
    }
    | {
      type: "SET_ADDRESS"
      fromAddress?: StateType["fromAddress"]
      toAddress?: StateType["toAddress"]
    }
    | {
      type: "SET_CHAIN_ID"
      chainId?: StateType["chainId"]
    }
    | {
      type: "RESET_WEB3_PROVIDERS"
    }
  