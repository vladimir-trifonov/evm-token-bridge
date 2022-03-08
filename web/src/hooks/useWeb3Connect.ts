import { useCallback, useEffect, useState } from "react"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { providers } from "ethers"
import Web3Modal from "web3modal"
import { toast } from 'react-toastify'

import { getChainData, getProviderToChainData, getSupportedChains } from "../helpers/utilities"
import { IChainData } from "../types"

const INFURA_ID = process.env.REACT_APP_INFURA_ID

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID,
    },
  }
}

let web3Modal: any
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions,
  })
}

const useWeb3Connect = (state: any, dispatch: any): any => {
  const { providerFrom, chainId } = state
  const [providerToChainData, setProviderToChainData] = useState<null | IChainData>(null)

  const connect = useCallback(async function () {
    try {
      const providerFrom = await web3Modal.connect()

      const web3ProviderFrom = new providers.Web3Provider(providerFrom)

      const fromSigner = web3ProviderFrom.getSigner()
      const fromAddress = await fromSigner.getAddress()
      const network = await web3ProviderFrom.getNetwork()

      const providerToChainData = getProviderToChainData(network)
      console.log("From address", fromAddress)

      let web3ProviderTo = null
      let toAddress = null

      if (providerToChainData) {
        setProviderToChainData(providerToChainData)
        web3ProviderTo = new providers.JsonRpcProvider(providerToChainData.rpc_url)
        const toSigner = web3ProviderTo.getSigner()
        toAddress = fromAddress
      
        try {
          toAddress = await toSigner.getAddress()
        } catch (e) {}
        console.log("To address", toAddress)
      }


      dispatch({
        type: "SET_WEB3_PROVIDER_FROM",
        providerFrom,
        web3ProviderFrom,
        web3ProviderTo,
        toAddress: toAddress,
        fromAddress,
        chainId: network.chainId
      })
    } catch (e: any) {
      toast.info(e.message)
    }
  }, [dispatch])

  const disconnect = useCallback(
    async function () {
      try {
        await web3Modal.clearCachedProvider()
        if (providerFrom?.disconnect && typeof providerFrom.disconnect === "function") {
          await providerFrom.disconnect()
        }
        dispatch({
          type: "RESET_WEB3_PROVIDERS",
        })
      } catch (e: any) {
        toast.info(e.message)
      }
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

      const handleDisconnect = (error: { code: number, message: string }) => {
        console.log("disconnect", error)
        disconnect()
      }

      providerFrom.on("accountsChanged", handleAccountsChanged)
      providerFrom.on("chainChanged", handleChainChanged)
      providerFrom.on("disconnect", handleDisconnect)

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

  const onNetworkChange = async ({ target: { value: chainId }}: { target: any }) => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: `0x${Number(chainId).toString(16)}` }] })
      } catch (error) {
        console.error(error)
      }
    }
  }

  return [{ connect, disconnect, onNetworkChange }, { chainDataFrom, chainDataTo, supportedChains, ...state }]
}

export default useWeb3Connect