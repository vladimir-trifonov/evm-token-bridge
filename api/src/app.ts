require("dotenv").config()

// Using ethers.js instead of web3 because on hardhat node 
// there is no websocket and web3 couln't listen for events
const ethers = require("ethers");

const FW7_BRIDGE_CONTRACT_ADDRESS = process.env.FW7_BRIDGE_CONTRACT_ADDRESS;
const FW7_BRIDGE_CONTRACT_ABI = require("../abis/FW7Bridge.json").abi;
const fw7Provider = new ethers.providers.JsonRpcProvider(process.env.FW7_NODE_URL);
const fw7Admin = new ethers.Wallet(process.env.FW7_BRIDGE_CONTRACT_ADDRESS_PRIVATE_KEY, fw7Provider);
const fw7BridgeContract = new ethers.Contract(FW7_BRIDGE_CONTRACT_ADDRESS, FW7_BRIDGE_CONTRACT_ABI, fw7Admin);

const XFW7_BRIDGE_CONTRACT_ADDRESS = process.env.XFW7_BRIDGE_CONTRACT_ADDRESS;
const XFW7_BRIDGE_CONTRACT_ABI = require("../abis/XFW7Bridge.json").abi;
const xfw7Provider = new ethers.providers.JsonRpcProvider(process.env.XFW7_NODE_URL);
const xfw7Admin = new ethers.Wallet(process.env.XFW7_BRIDGE_CONTRACT_ADDRESS_PRIVATE_KEY, xfw7Provider);
const xfw7BridgeContract = new ethers.Contract(XFW7_BRIDGE_CONTRACT_ADDRESS, XFW7_BRIDGE_CONTRACT_ABI, xfw7Admin);

async function listen() {
    const transaction = (bridgeContract) => async (_, receiver, amount, { transactionHash }) => {
        try {
            const receipt = await bridgeContract.tokensBridged(receiver, amount, transactionHash, { gasLimit: 6721975 });
            console.log(`Transaction hash: ${receipt.transactionHash}`);
            console.log(`Processed deposit - receiver ${receiver} - amount ${amount} tokens`);
        } catch (e) { console.error(e) }
    }

    fw7BridgeContract.on("DepositTokens", transaction(xfw7BridgeContract))
    fw7BridgeContract.on("ReturnTokens", transaction(xfw7BridgeContract))

    xfw7BridgeContract.on("DepositTokens", transaction(fw7BridgeContract))
    xfw7BridgeContract.on("ReturnTokens", transaction(fw7BridgeContract))
};

listen();