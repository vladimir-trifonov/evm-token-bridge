import { useCallback, useEffect, useState } from 'react'
import { isBaseChain } from '../helpers/utilities'
import { getContract } from '../helpers/ethers'
import FW7Token from '../constants/abis/FW7Token.json'
import FW7Bridge from '../constants/abis/FW7Bridge.json'
import XFW7Token from '../constants/abis/XFW7Token.json'
import XFW7Bridge from '../constants/abis/XFW7Bridge.json'

const baseChainTokenAddress = process.env.REACT_APP_FW7_TOKEN_ADDRESS as string
const baseChainBridgeAddress = process.env.REACT_APP_FW7_BRIDGE_ADDRESS as string
const sideChainTokenAddress = process.env.REACT_APP_XFW7_TOKEN_ADDRESS as string
const sideChainBridgeAddress = process.env.REACT_APP_XFW7_BRIDGE_ADDRESS as string

const useWeb3Contracts = (state: any): any => {
  const { web3ProviderFrom, web3ProviderTo, chainId, fromAddress, toAddress } = state

  const [fromBalance, setFromBalance] = useState("0")
  const [toBalance, setToBalance] = useState("0")
  const [fromBridged, setFromBridged] = useState("0")
  const [toBridged, setToBridged] = useState("0")

  const [tokenFromContract, setTokenFromContract] = useState<null | any>(null)
  const [bridgeFromContract, setBridgeFromContract] = useState<null | any>(null)
  const [tokenToContract, setTokenToContract] = useState<null | any>(null)
  const [bridgeToContract, setBridgeToContract] = useState<null | any>(null)

  const getContracts = useCallback(async function () {
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
  }, [chainId, web3ProviderFrom, web3ProviderTo])

  const clearContracts = function () {
    setTokenFromContract(null)
    setBridgeFromContract(null)
    setTokenToContract(null)
    setBridgeToContract(null)
  }

  useEffect(() => {
    if (web3ProviderFrom && web3ProviderTo && chainId) {
      getContracts()
    } else {
      clearContracts()
    }
  }, [chainId, getContracts, web3ProviderFrom, web3ProviderTo])

  useEffect(() => {
    const getFromBalance = async () => {
      const balance = await tokenFromContract?.balanceOf(fromAddress)
      setFromBalance(balance.toString())
    }

    const getFromBridged = async () => {
      const bridged = await bridgeFromContract?.bridged(fromAddress)
      setFromBridged(bridged.toString())
    }
    
    if (tokenFromContract && fromAddress) {
      getFromBalance()
      getFromBridged()
    }
  }, [bridgeFromContract, fromAddress, tokenFromContract])

  useEffect(() => {
    const getToBalance = async () => {
      const balance = await tokenToContract?.balanceOf(toAddress)
      setToBalance(balance.toString())
    }

    const getToBridged = async () => {
      const bridged = await bridgeToContract?.bridged(toAddress)
      setToBridged(bridged.toString())
    }
    
    if (tokenToContract && toAddress) {
      getToBalance()
      getToBridged()
    }
  }, [bridgeToContract, toAddress, tokenToContract])

  const onDeposit = async (amount: string) => {
    await tokenFromContract.approve(isBaseChain(chainId) ? baseChainBridgeAddress : sideChainBridgeAddress, amount);
		const transaction = await bridgeFromContract.depositTokens(toAddress, parseFloat(amount));
    await transaction.wait();
  }

  const onClaim = async (type: string) => {
		const transaction = await (type === "from" ? bridgeFromContract : bridgeToContract).claimTokens();
    await transaction.wait();
  }

  const onReturn = async (type: string) => {
		const transaction = await (type === "from" ? bridgeFromContract : bridgeToContract).returnTokens(toAddress);
    await transaction.wait();
  }
  
  return [{ onDeposit, onClaim, onReturn }, { from: { address: fromAddress, balance: fromBalance, bridged: fromBridged }, to: { address: toAddress, balance: toBalance, bridged: toBridged }}]
}

export default useWeb3Contracts