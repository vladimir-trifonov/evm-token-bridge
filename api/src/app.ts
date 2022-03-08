require("dotenv").config()
const ethers = require("ethers")

const FW7_BRIDGE_CONTRACT_ADDRESS = process.env.FW7_BRIDGE_CONTRACT_ADDRESS
const FW7_BRIDGE_CONTRACT_ABI = require("../abis/FW7Bridge.json").abi
const fw7NodeUrl = process.env.FW7_NODE_URL
const fw7Provider = new (fw7NodeUrl.startsWith("ws") ? ethers.providers.WebSocketProvider : ethers.providers.JsonRpcProvider)(fw7NodeUrl)
const fw7PK = process.env.FW7_BRIDGE_CONTRACT_OWNER_WALLET_PRIVATE_KEY
const fw7Admin = new ethers.Wallet(fw7PK.startsWith("0x") ? fw7PK.slice(2): fw7PK, fw7Provider)
const fw7BridgeContract = new ethers.Contract(FW7_BRIDGE_CONTRACT_ADDRESS, FW7_BRIDGE_CONTRACT_ABI, fw7Admin)

const XFW7_BRIDGE_CONTRACT_ADDRESS = process.env.XFW7_BRIDGE_CONTRACT_ADDRESS
const XFW7_BRIDGE_CONTRACT_ABI = require("../abis/XFW7Bridge.json").abi
const xfw7NodeUrl = process.env.XFW7_NODE_URL
const xfw7Provider = new (xfw7NodeUrl.startsWith("ws") ? ethers.providers.WebSocketProvider : ethers.providers.JsonRpcProvider)(xfw7NodeUrl)
const xfw7PK = process.env.XFW7_BRIDGE_CONTRACT_OWNER_WALLET_PRIVATE_KEY
const xfw7Admin = new ethers.Wallet(xfw7PK.startsWith("0x") ? xfw7PK.slice(2): xfw7PK, xfw7Provider)
const xfw7BridgeContract = new ethers.Contract(XFW7_BRIDGE_CONTRACT_ADDRESS, XFW7_BRIDGE_CONTRACT_ABI, xfw7Admin)

async function listen() {
    const transaction = (bridgeContract) => async (_, receiver, amount, { transactionHash }) => {
        try {
            const receipt = await bridgeContract.tokensBridged(receiver, amount, transactionHash, { gasLimit: parseInt(process.env.GAS_LIMIT) })
            console.log(`Transaction hash: ${receipt.hash}`)
            console.log(`Processed deposit - receiver ${receiver} - amount ${ethers.utils.formatEther(amount)} tokens`)
        } catch (e) { console.error(e) }
    }

    fw7BridgeContract.on("DepositTokens", transaction(xfw7BridgeContract))
    fw7BridgeContract.on("ReturnTokens", transaction(xfw7BridgeContract))

    xfw7BridgeContract.on("DepositTokens", transaction(fw7BridgeContract))
    xfw7BridgeContract.on("ReturnTokens", transaction(fw7BridgeContract))

    console.log("App started: Listening for DepositTokens and ReturnTokens events.")
}

listen()