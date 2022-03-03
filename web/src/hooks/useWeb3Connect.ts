import { useCallback, useEffect, useState } from "react"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { providers } from "ethers"
import Web3Modal from "web3modal"

import { getChainData, getProviderToChainData, getSupportedChains } from "../helpers/utilities"
import { IChainData } from "../types"

const INFURA_ID = process.env.REACT_APP_INFURA_ID

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  }
}

let web3Modal: any
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions, // required
  })
}

const useWeb3Connect = (state: any, dispatch: any): any => {
  const { providerFrom, chainId } = state
  const [providerToChainData, setProviderToChainData] = useState<null | IChainData>(null)
  
  const connect = useCallback(async function () {
    const providerFrom = await web3Modal.connect()
    
    const web3ProviderFrom = new providers.Web3Provider(providerFrom)
  
    const fromSigner = web3ProviderFrom.getSigner()
    const fromAddress = await fromSigner.getAddress()
    const network = await web3ProviderFrom.getNetwork()

    const providerToChainData = getProviderToChainData(network)
    setProviderToChainData(providerToChainData)
    const web3ProviderTo = new providers.JsonRpcProvider(providerToChainData!.rpc_url)
    const toSigner = web3ProviderTo.getSigner()
    const toAddress = await toSigner.getAddress()

    console.log("From address", fromAddress)
    console.log("To address", toAddress)

    dispatch({
      type: "SET_WEB3_PROVIDER_FROM",
      providerFrom,
      web3ProviderFrom,
      web3ProviderTo,
      toAddress: toAddress,
      fromAddress,
      chainId: network.chainId
    })
  }, [dispatch])

  const disconnect = useCallback(
    async function () {
      await web3Modal.clearCachedProvider()
      if (providerFrom?.disconnect && typeof providerFrom.disconnect === "function") {
        await providerFrom.disconnect()
      }
      dispatch({
        type: "RESET_WEB3_PROVIDERS",
      })
    },
    [dispatch, providerFrom]
  )

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [connect])

  useEffect(() => {
    if (providerFrom?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("accountsChanged", accounts)
        dispatch({
          type: "SET_ADDRESS",
          fromAddress: accounts[0],
        })
      }

      const handleChainChanged = (_hexChainId: string) => {
        window.location.reload()
      }

      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log("disconnect", error)
        disconnect()
      }

      providerFrom.on("accountsChanged", handleAccountsChanged)
      providerFrom.on("chainChanged", handleChainChanged)
      providerFrom.on("disconnect", handleDisconnect)

      // Subscription Cleanup
      return () => {
        if (providerFrom.removeListener) {
          providerFrom.removeListener("accountsChanged", handleAccountsChanged)
          providerFrom.removeListener("chainChanged", handleChainChanged)
          providerFrom.removeListener("disconnect", handleDisconnect)
        }
      }
    }
  }, [providerFrom, disconnect, dispatch])


  const chainDataFrom = getChainData(chainId)
  const chainDataTo = providerToChainData
  const supportedChains = getSupportedChains(chainId)

  return [{ connect, disconnect }, { chainDataFrom, chainDataTo, supportedChains, ...state }]
}

export default useWeb3Connect