const Web3 = require("web3");
const ethers = require("ethers");
require("dotenv").config()

const baseWeb3 = new Web3(process.env.BASE_NODE_URL);
const sideWeb3 = new Web3(process.env.SIDE_NODE_URL);

const BASE_BRIDGE_CONTRACT_ADDRESS = process.env.BASE_BRIDGE_CONTRACT_ADDRESS;
const BASE_BRIDGE_CONTRACT_ABI = require("../abis/FW7Bridge.json").abi;
const baseBridgeContract = new baseWeb3.eth.Contract(BASE_BRIDGE_CONTRACT_ABI, BASE_BRIDGE_CONTRACT_ADDRESS);
const { address: baseAdmin } = baseWeb3.eth.accounts.wallet.add(process.env.BASE_BRIDGE_CONTRACT_ADDRESS_PRIVATE_KEY);

const SIDE_BRIDGE_CONTRACT_ADDRESS = process.env.SIDE_BRIDGE_CONTRACT_ADDRESS;
const SIDE_BRIDGE_CONTRACT_ABI = require("../abis/XFW7Bridge.json").abi;
const sideBridgeContract = new baseWeb3.eth.Contract(SIDE_BRIDGE_CONTRACT_ABI, SIDE_BRIDGE_CONTRACT_ADDRESS);
const { address: sideAdmin } = sideWeb3.eth.accounts.wallet.add(process.env.SIDE_BRIDGE_CONTRACT_ADDRESS_PRIVATE_KEY);
require("dotenv").config()

const baseProvider = new ethers.providers.JsonRpcProvider(process.env.BASE_NODE_URL);
const baseContract = new ethers.Contract(BASE_BRIDGE_CONTRACT_ADDRESS, BASE_BRIDGE_CONTRACT_ABI, baseProvider);
const { address: bAdmin } = new ethers.Wallet(process.env.BASE_BRIDGE_CONTRACT_ADDRESS_PRIVATE_KEY, baseProvider);

const sideProvider = new ethers.providers.JsonRpcProvider(process.env.SIDE_NODE_URL);
const sideContract = new ethers.Contract(SIDE_BRIDGE_CONTRACT_ADDRESS, SIDE_BRIDGE_CONTRACT_ABI, sideProvider);
const { address: sAdmin } = new ethers.Wallet(process.env.SIDE_BRIDGE_CONTRACT_ADDRESS_PRIVATE_KEY, sideProvider);

async function listen() {
    const depositTransaction = async ({ from, amount, transactionHash }, bridgeContract, admin, web3) => {
        try {
            const tx = bridgeContract.methods.tokensBridged(from, amount, transactionHash);
            const data = tx.encodeABI();
            const [gasPrice, gasCost] = await Promise.all([
                baseWeb3.eth.getGasPrice(),
                tx.estimateGas({ from: admin, to: bridgeContract.options.address, data }),
            ]);
            const txData = {
                from: admin,
                to: bridgeContract.options.address,
                data,
                nonce: await web3.eth.getTransactionCount(admin),
                // gas: gasCost, // For Ropsten, Rinkeby, Kovan, Goerli
                gasLimit: 6721975, // For Ganache, Hardhat
                gasPrice
            };
            const receipt = await web3.eth.sendTransaction(txData);
            console.log(`Transaction hash: ${receipt.transactionHash}`);
            console.log(`
                    Processed deposit:
                    - from ${from} 
                    - amount ${amount} tokens
                `);
        } catch (e) {
            console.error(e)
        }
    }

    const returnTransaction = async ({ to, amount, transactionHash }, bridgeContract, admin, web3) => {
        try {
            const tx = bridgeContract.methods.tokensBridged(to, amount, transactionHash);
            const data = tx.encodeABI();
            const [gasPrice, gasCost] = await Promise.all([
                baseWeb3.eth.getGasPrice(),
                tx.estimateGas({ from: admin, to: bridgeContract.options.address, data }),
            ]);
            const txData = {
                from: admin,
                to: bridgeContract.options.address,
                data,
                nonce: await web3.eth.getTransactionCount(admin),
                // gas: gasCost, // For Ropsten, Rinkeby, Kovan, Goerli
                gasLimit: 6721975, // For Ganache, Hardhat
                gasPrice
            };
            const receipt = await web3.eth.sendTransaction(txData);
            console.log(`Transaction hash: ${receipt.transactionHash}`);
            console.log(`
                Processed return:
                - to ${to} 
                - amount ${amount} tokens
            `);
        } catch (e) {
            console.error(e)
        }
    }

    baseContract.on("DepositTokens", async (_, to, amount, { transactionHash }) => {
        depositTransaction({ from: to, amount, transactionHash }, sideBridgeContract, sideAdmin, sideWeb3)
    })

    sideContract.on("DepositTokens", async (_, to, amount, { transactionHash }) => {
        depositTransaction({ from: to, amount, transactionHash }, baseBridgeContract, baseAdmin, baseWeb3)
    })

    baseContract.on("ReturnTokens", async (_, to, amount, { transactionHash }) => {
        returnTransaction({ to, amount, transactionHash }, sideBridgeContract, sideAdmin, sideWeb3)
    })

    sideContract.on("ReturnTokens", async (_, to, amount, { transactionHash }) => {
        returnTransaction({ to, amount, transactionHash }, baseBridgeContract, baseAdmin, baseWeb3)
    })

    // Doesn't work with hardhat - use it when ws exists
    // baseBridgeContract.events.DepositTokens({
    //     filter: { value: [] },
    //     fromBlock: 0// await baseWeb3.eth.getBlockNumber()
    // })
    //     .on("data", async (event: any) => {
    //         depositTransaction(getDepositDetails(event), sideBridgeContract, sideAdmin, sideNonce, sideWeb3)
    //         sideNonce++
    //     })
    //     .on("changed", (changed: any) => {
    //         // TODO
    //     })
    //     .on("error", (err: any) => { throw err })
    //     // .on("connected", (str: string) => { })

    // Doesn't work with hardhat - use it when ws exists
    // sideBridgeContract.events.DepositTokens({
    //     filter: { value: [] },
    //     fromBlock: 0// await sideWeb3.eth.getBlockNumber()
    // })
    //     .on("data", async (event: any) => {
    //         depositTransaction(getDepositDetails(event), baseBridgeContract, baseAdmin, baseNonce, baseWeb3)
    //         baseNonce++
    //     })
    //     .on("changed", (changed: any) => {
    //         // TODO
    //     })
    //     .on("error", (err: any) => { throw err })
    //     .on("connected", (str: string) => { })
};

listen();

function getDepositDetails(event) {
    const to = event["returnValues"]["0"];
    const amount = event["returnValues"]["1"];
    const transactionHash = event["transactionHash"];
    return { to, amount, transactionHash }
};

function getReturnDetails(event) {
    const to = event["returnValues"]["0"];
    const amount = event["returnValues"]["1"];
    const transactionHash = event["transactionHash"];
    return { to, amount, transactionHash }
};