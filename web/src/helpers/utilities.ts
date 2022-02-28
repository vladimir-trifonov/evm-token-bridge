import { IChainData } from '../types'
import supportedChains, { baseChainsIds, sideChainsIds } from '../constants/chains'

export function isBaseChain(chainId: number) {
  return baseChainsIds.includes(chainId)
}

export function getSupportedChains(chainId: number): IChainData[] {
  return [chainId, (isBaseChain(chainId) ? sideChainsIds[baseChainsIds.indexOf(chainId)] : baseChainsIds[sideChainsIds.indexOf(chainId)])]
    .map((id) => supportedChains.find(({ chain_id }) => chain_id === id) as IChainData)
}

export function getTokenSymbol(chainId: number) {
  return isBaseChain(chainId) ? 'FW7' : 'xFW7'
}

export function getProviderToChainData(network: any) {
  const providerToChainId = isBaseChain(network.chainId) 
    ? sideChainsIds[baseChainsIds.indexOf(network.chainId)] 
    : baseChainsIds[sideChainsIds.indexOf(network.chainId)]
  return supportedChains.find((chainData) => chainData.chain_id === providerToChainId) || null
}

export function getChainData(chainId?: number): IChainData | null {
  if (!chainId) {
    return null
  }
  const chainData = supportedChains.filter(
    (chain: IChainData) => chain.chain_id === chainId
  )[0]

  if (!chainData) {
    throw new Error(`ChainId missing or not supported: ${chainData}`)
  }

  const API_KEY = process.env.REACT_APP_INFURA_ID

  if (
    chainData.rpc_url.includes('infura.io') &&
    chainData.rpc_url.includes('%API_KEY%') &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY)

    return {
      ...chainData,
      rpc_url: rpcUrl,
    }
  }

  return chainData
}

export function ellipseAddress(address = '', width = 10): string {
  if (!address) {
    return ''
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`
}
