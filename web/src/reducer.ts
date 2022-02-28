type StateType = {
  providerFrom?: any
  web3ProviderFrom?: any
  web3ProviderTo?: any
  address?: string
  chainId?: number
}

export type ActionType =
  | {
    type: 'SET_WEB3_PROVIDER_FROM'
    providerFrom?: StateType['providerFrom']
    web3ProviderFrom?: StateType['web3ProviderFrom']
    web3ProviderTo?: StateType['web3ProviderTo']
    address?: StateType['address']
    chainId?: StateType['chainId']
  }
  | {
    type: 'SET_ADDRESS'
    address?: StateType['address']
  }
  | {
    type: 'SET_CHAIN_ID'
    chainId?: StateType['chainId']
  }
  | {
    type: 'RESET_WEB3_PROVIDERS'
  }

export const initialState: StateType = {
  providerFrom: null,
  web3ProviderFrom: null,
  web3ProviderTo: null,
  address: undefined,
  chainId: undefined,
}

const reducer = (state: StateType = initialState, action: ActionType): StateType => {
  switch (action.type) {
    case 'SET_WEB3_PROVIDER_FROM':
      return {
        ...state,
        providerFrom: action.providerFrom,
        web3ProviderFrom: action.web3ProviderFrom,
        web3ProviderTo: action.web3ProviderTo,
        address: action.address,
        chainId: action.chainId,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        address: action.address,
      }
    case 'SET_CHAIN_ID':
      return {
        ...state,
        chainId: action.chainId,
      }
    case 'RESET_WEB3_PROVIDERS':
      return initialState
    default:
      throw new Error()
  }
}

export default reducer