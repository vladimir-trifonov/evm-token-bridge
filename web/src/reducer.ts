type StateType = {
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

export const initialState: StateType = {
  providerFrom: null,
  web3ProviderFrom: null,
  web3ProviderTo: null,
  fromAddress: undefined,
  toAddress: undefined,
  chainId: undefined,
}

const reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case "SET_WEB3_PROVIDER_FROM":
      return {
        ...state,
        providerFrom: action.providerFrom,
        web3ProviderFrom: action.web3ProviderFrom,
        web3ProviderTo: action.web3ProviderTo,
        fromAddress: action.fromAddress,
        toAddress: action.toAddress,
        chainId: action.chainId,
      }
    case "SET_ADDRESS":
      return {
        ...state,
        fromAddress: action.fromAddress,
      }
    case "SET_CHAIN_ID":
      return {
        ...state,
        chainId: action.chainId,
      }
    case "RESET_WEB3_PROVIDERS":
      return initialState
    default:
      throw new Error()
  }
}

export default reducer