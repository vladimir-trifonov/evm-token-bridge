import { useCallback, useEffect, useState } from "react"
import { utils, Contract } from "ethers"
import { signERC2612Permit } from "eth-permit"
import { toast } from "react-toastify"

import { StateType } from "../types"
import { isFW7Chain } from "../helpers/utilities"
import { getContract } from "../helpers/ethers"
import FW7Token from "../constants/abis/FW7Token.json"
import FW7Bridge from "../constants/abis/FW7Bridge.json"
import XFW7Token from "../constants/abis/XFW7Token.json"
import XFW7Bridge from "../constants/abis/XFW7Bridge.json"

const fw7ChainTokenAddress = process.env.REACT_APP_FW7_TOKEN_ADDRESS
const fw7ChainBridgeAddress = process.env.REACT_APP_FW7_BRIDGE_ADDRESS
const xfw7ChainTokenAddress = process.env.REACT_APP_XFW7_TOKEN_ADDRESS
const xfw7ChainBridgeAddress = process.env.REACT_APP_XFW7_BRIDGE_ADDRESS

const useWeb3Contracts = (state: StateType) => {
  const { web3ProviderFrom, web3ProviderTo, chainId, fromAddress, toAddress } = state

  const [fromBalance, setFromBalance] = useState("0")
  const [toBalance, setToBalance] = useState("0")
  const [fromBridged, setFromBridged] = useState("0.0")
  const [toBridged, setToBridged] = useState("0.0")
  const [fee, setFee] = useState(null)

  const [tokenFromContract, setTokenFromContract] = useState<null | Contract>(null)
  const [bridgeFromContract, setBridgeFromContract] = useState<null | Contract>(null)
  const [tokenToContract, setTokenToContract] = useState<null | Contract>(null)
  const [bridgeToContract, setBridgeToContract] = useState<null | Contract>(null)

  const getContractsAndConsts = useCallback(async function () {
    try {
      const isProviderFromFW7Chain = isFW7Chain(chainId!)
      const fw7ChainProvider = isProviderFromFW7Chain ? web3ProviderFrom : web3ProviderTo
      const xfw7ChainProvider = isProviderFromFW7Chain ? web3ProviderTo : web3ProviderFrom
  
      const fw7TokenContract = getContract(
        fw7ChainTokenAddress!, 
        FW7Token.abi, 
        isProviderFromFW7Chain ? fw7ChainProvider.getSigner() : fw7ChainProvider
      )
      const fw7BridgeContract = getContract(
        fw7ChainBridgeAddress!, FW7Bridge.abi, 
        isProviderFromFW7Chain ? fw7ChainProvider.getSigner() : fw7ChainProvider
      )
      const xFw7TokenContract = getContract(
        xfw7ChainTokenAddress!, XFW7Token.abi, 
        isProviderFromFW7Chain ? xfw7ChainProvider : xfw7ChainProvider.getSigner()
      )
      const xFfw7BridgeContract = getContract(
        xfw7ChainBridgeAddress!, 
        XFW7Bridge.abi, 
        isProviderFromFW7Chain ? xfw7ChainProvider : xfw7ChainProvider.getSigner()
      )

      setTokenFromContract(isProviderFromFW7Chain ? fw7TokenContract : xFw7TokenContract)
      setBridgeFromContract(isProviderFromFW7Chain ? fw7BridgeContract : xFfw7BridgeContract)
      setTokenToContract(isProviderFromFW7Chain ? xFw7TokenContract : fw7TokenContract)
      setBridgeToContract(isProviderFromFW7Chain ? xFfw7BridgeContract : fw7BridgeContract)

      setFee(await fw7BridgeContract.fee())
    } catch (e: any) {
      toast.info(e.message)
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
    }
  }, [toAddress, tokenToContract])

  const getToBridged = useCallback(async () => {
    try {
      const bridged = await bridgeToContract?.bridged(toAddress)
      setToBridged(utils.formatEther(bridged.toString()).toString())
    } catch (e: any) {
      setToBridged("0.0")
      toast.info(e.message)
    }
  }, [bridgeToContract, toAddress])

  const getFromBalance = useCallback(async () => {
    try {
      const balance = await tokenFromContract?.balanceOf(fromAddress)
      setFromBalance(utils.formatEther(balance.toString()).toString())
    } catch (e: any) {
      setFromBalance("")
      toast.info(e.message)
    }
  }, [fromAddress, tokenFromContract])

  const getFromBridged = useCallback(async () => {
    try {
      const bridged = await bridgeFromContract?.bridged(fromAddress)
      setFromBridged(utils.formatEther(bridged.toString()).toString())
    } catch (e: any) {
      setFromBridged("0.0")
      toast.info(e.message)
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
      const amountInEth = utils.parseEther(amount)
      const { deadline, v, r, s } = await signERC2612Permit(
        (window as any).ethereum,
        tokenFromContract!.address, 
        fromAddress!, 
        bridgeFromContract!.address, 
        amountInEth.toString()
      )
      const transaction = await bridgeFromContract!
        .depositTokens(toAddress, amountInEth, deadline, v, r, s, isFW7Chain(chainId!) ? { value: fee } : {})
      await transaction.wait()
    } catch (e: any) {
      toast.info(e.message)
    }
  }

  const onClaim = async () => {
    try {
      const transaction = await bridgeFromContract!.claimTokens(isFW7Chain(chainId!) ? { value: fee } : {})
      await transaction.wait()
    } catch (e: any) {
      toast.info(e.message)
    }
  }

  const onReturn = async () => {
    try {
      const transaction = await bridgeFromContract!.returnTokens(toAddress, isFW7Chain(chainId!) ? { value: fee } : {})
      await transaction.wait()
    } catch (e: any) {
      toast.info(e.message)
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