import { providers } from "ethers"

import { IChainData } from "../types"
import supportedChains, { fw7ChainIds, xfw7ChainsIds } from "../constants/chains"

export function isFW7Chain(chainId: number) {
  return fw7ChainIds.includes(chainId)
}

export function getSupportedChains(chainId: number): IChainData[] {
  return [chainId, (isFW7Chain(chainId) ? xfw7ChainsIds[fw7ChainIds.indexOf(chainId)] : fw7ChainIds[xfw7ChainsIds.indexOf(chainId)])]
    .map((id) => supportedChains.find(({ chain_id }) => chain_id === id) as IChainData).filter((chainData) => !!chainData)
}

export function getTokenSymbol(chainId: number) {
  return isFW7Chain(chainId) ? "FW7" : "xFW7"
}

export function getProviderToChainData(network: providers.Network) {
  const providerToChainId = isFW7Chain(network.chainId) 
    ? xfw7ChainsIds[fw7ChainIds.indexOf(network.chainId)] 
    : fw7ChainIds[xfw7ChainsIds.indexOf(network.chainId)]
  const chainDataRaw = supportedChains.find((chainData) => chainData.chain_id === providerToChainId)
  return chainDataRaw ? getChainData(chainDataRaw.chain_id) : null
}

export function getChainData(chainId?: number): IChainData | null {
  if (!chainId) {
    return null
  }
  const chainData = supportedChains.filter(
    (chain: IChainData) => chain.chain_id === chainId
  )[0]

  if (!chainData) return null

  const API_KEY = process.env.REACT_APP_INFURA_ID

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY)

    return {
      ...chainData,
      rpc_url: rpcUrl,
    }
  }

  return chainData
}

export function ellipseAddress(address = "", width = 10): string {
  if (!address) {
    return ""
  }
  return `${address.slice(0, width)}...${address.slice(-width)}`
}
