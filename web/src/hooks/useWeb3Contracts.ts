import { useCallback, useEffect, useState } from "react"
import { isBaseChain } from "../helpers/utilities"
import { getContract } from "../helpers/ethers"
import FW7Token from "../constants/abis/FW7Token.json"
import FW7Bridge from "../constants/abis/FW7Bridge.json"
import XFW7Token from "../constants/abis/XFW7Token.json"
import XFW7Bridge from "../constants/abis/XFW7Bridge.json"
import { utils } from "ethers"
import { signERC2612Permit } from 'eth-permit'
import { toast } from 'react-toastify'

const baseChainTokenAddress = process.env.REACT_APP_FW7_TOKEN_ADDRESS as string
const baseChainBridgeAddress = process.env.REACT_APP_FW7_BRIDGE_ADDRESS as string
const sideChainTokenAddress = process.env.REACT_APP_XFW7_TOKEN_ADDRESS as string
const sideChainBridgeAddress = process.env.REACT_APP_XFW7_BRIDGE_ADDRESS as string

const useWeb3Contracts = (state: any): any => {
  const { web3ProviderFrom, web3ProviderTo, chainId, fromAddress, toAddress } = state

  const [fromBalance, setFromBalance] = useState("0")
  const [toBalance, setToBalance] = useState("0")
  const [fromBridged, setFromBridged] = useState("0.0")
  const [toBridged, setToBridged] = useState("0.0")
  const [fee, setFee] = useState(null)

  const [tokenFromContract, setTokenFromContract] = useState<null | any>(null)
  const [bridgeFromContract, setBridgeFromContract] = useState<null | any>(null)
  const [tokenToContract, setTokenToContract] = useState<null | any>(null)
  const [bridgeToContract, setBridgeToContract] = useState<null | any>(null)

  const getContractsAndConsts = useCallback(async function () {
    try {
      const isProviderFromBaseChain = isBaseChain(chainId)
      const baseChainProvider = isProviderFromBaseChain ? web3ProviderFrom : web3ProviderTo
      const sideChainProvider = isProviderFromBaseChain ? web3ProviderTo : web3ProviderFrom
  
      const fw7TokenContract = getContract(baseChainTokenAddress as string, FW7Token.abi, baseChainProvider.getSigner())
      const fw7BridgeContract = getContract(baseChainBridgeAddress as string, FW7Bridge.abi, baseChainProvider.getSigner())
      const xFw7TokenContract = getContract(sideChainTokenAddress as string, XFW7Token.abi, sideChainProvider.getSigner())
      const xFfw7BridgeContract = getContract(sideChainBridgeAddress as string, XFW7Bridge.abi, sideChainProvider.getSigner())

      setTokenFromContract(isProviderFromBaseChain ? fw7TokenContract : xFw7TokenContract)
      setBridgeFromContract(isProviderFromBaseChain ? fw7BridgeContract : xFfw7BridgeContract)
      setTokenToContract(isProviderFromBaseChain ? xFw7TokenContract : fw7TokenContract)
      setBridgeToContract(isProviderFromBaseChain ? xFfw7BridgeContract : fw7BridgeContract)

      setFee(await fw7BridgeContract.fee())
    } catch (e: any) {
      toast.info(e.message)
      console.warn(e)
    }
  }, [chainId, web3ProviderFrom, web3ProviderTo])

  const clearContracts = function () {
    setTokenFromContract(null)
    setBridgeFromContract(null)
    setTokenToContract(null)
    setBridgeToContract(null)
    setFee(null)
  }

  useEffect(() => {
    if (web3ProviderFrom && web3ProviderTo && chainId) {
      getContractsAndConsts()
    } else {
      clearContracts()
    }
  }, [chainId, getContractsAndConsts, web3ProviderFrom, web3ProviderTo])

  const getToBalance = useCallback(async () => {
    try {
      const balance = await tokenToContract?.balanceOf(toAddress)
      setToBalance(utils.formatEther(balance.toString()).toString())
    } catch (e: any) {
      setToBalance("")
      toast.info(e.message)
      console.warn(e)
    }
  }, [toAddress, tokenToContract])

  const getToBridged = useCallback(async () => {
    try {
      const bridged = await bridgeToContract?.bridged(toAddress)
      setToBridged(utils.formatEther(bridged.toString()).toString())
    } catch (e: any) {
      setToBridged("0.0")
      toast.info(e.message)
      console.warn(e)
    }
  }, [bridgeToContract, toAddress])

  const getFromBalance = useCallback(async () => {
    try {
      const balance = await tokenFromContract?.balanceOf(fromAddress)
      setFromBalance(utils.formatEther(balance.toString()).toString())
    } catch (e: any) {
      setFromBalance("")
      toast.info(e.message)
      console.warn(e)
    }
  }, [fromAddress, tokenFromContract])

  const getFromBridged = useCallback(async () => {
    try {
      const bridged = await bridgeFromContract?.bridged(fromAddress)
      setFromBridged(utils.formatEther(bridged.toString()).toString())
    } catch (e: any) {
      setFromBridged("0.0")
      toast.info(e.message)
      console.warn(e)
    }
  }, [bridgeFromContract, fromAddress])

  useEffect(() => {
    if (tokenFromContract && fromAddress) {
      getFromBalance()
      getFromBridged()
    }
  }, [fromAddress, getFromBalance, getFromBridged, tokenFromContract])

  useEffect(() => {
    if (tokenToContract && toAddress) {
      getToBalance()
      getToBridged()
    }
  }, [getToBalance, getToBridged, toAddress, tokenToContract])

  const onDeposit = async (amount: string) => {
    try {
      debugger
      const amountInEth = utils.parseEther(amount)
      const { deadline, v, r, s } = await signERC2612Permit(
        window.ethereum,
        tokenFromContract.address, 
        fromAddress, 
        bridgeFromContract.address, 
        amountInEth.toString()
      )
      debugger
      const transaction = await bridgeFromContract
        .depositTokens(toAddress, amountInEth, deadline, v, r, s, isBaseChain(chainId) ? { value: fee } : {})
      await transaction.wait()
    } catch (e: any) {
      toast.info(e.message)
      console.warn(e)
    }
  }

  const onClaim = async () => {
    try {
      const transaction = await bridgeFromContract.claimTokens(isBaseChain(chainId) ? { value: fee } : {})
      await transaction.wait()
    } catch (e: any) {
      toast.info(e.message)
      console.warn(e)
    }
  }

  const onReturn = async () => {
    try {
      const transaction = await bridgeFromContract.returnTokens(toAddress, isBaseChain(chainId) ? { value: fee } : {})
      await transaction.wait()
    } catch (e: any) {
      toast.info(e.message)
      console.warn(e)
    }
  }

  useEffect(() => {
    if (bridgeFromContract?.on) {
      const bridgeReturnFromFilter = bridgeFromContract.filters.ReturnTokens(fromAddress)
      bridgeFromContract.on(bridgeReturnFromFilter, getFromBridged)

      return () => {
        if (bridgeFromContract.off) {
          bridgeFromContract.off(bridgeReturnFromFilter, getFromBridged)
        }
      }
    }
  }, [bridgeFromContract, fromAddress, getFromBridged])

  useEffect(() => {
    if (bridgeFromContract?.on) {
      const handleClaimTokens = () => {
        getFromBalance()
        getFromBridged()
      }

      const bridgeClaimFromFilter = bridgeFromContract.filters.ClaimTokens(fromAddress)
      bridgeFromContract.on(bridgeClaimFromFilter, handleClaimTokens)

      return () => {
        if (bridgeFromContract.off) {
          bridgeFromContract.off(bridgeClaimFromFilter, handleClaimTokens)
        }
      }
    }
  }, [bridgeFromContract, fromAddress, getFromBalance, getFromBridged])

  useEffect(() => {
    if (bridgeFromContract?.on) {
      const bridgeDepositFromFilter = bridgeFromContract.filters.DepositTokens(fromAddress)
      bridgeFromContract.on(bridgeDepositFromFilter, getFromBalance)

      return () => {
        if (bridgeFromContract.off) {
          bridgeFromContract.off(bridgeDepositFromFilter, getFromBalance)
        }
      }
    }
  }, [bridgeFromContract, fromAddress, getFromBalance])

  useEffect(() => {
    if (bridgeToContract?.on) {
      const bridgeBridgedToFilter = bridgeToContract.filters.TokensBridged(toAddress)
      bridgeToContract.on(bridgeBridgedToFilter, getToBridged)

      return () => {
        if (bridgeToContract.off) {
          bridgeToContract.off(bridgeBridgedToFilter, getToBridged)
        }
      }
    }
  }, [bridgeToContract, getToBridged, toAddress])

  return [{ onDeposit, onClaim, onReturn }, { 
    from: { address: fromAddress, balance: fromBalance, bridged: fromBridged }, 
    to: { address: toAddress, balance: toBalance, bridged: toBridged } 
  }]
}

export default useWeb3Contracts