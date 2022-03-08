# XFW7 Token Bridge 

# Prerequisites
1. [Node.js](https://nodejs.org/en/) version >= v16.14.0 
2. [Ganache truffle](https://trufflesuite.com/ganache/)

## Live Test - [Ropsten/Rinkeby Flow](DEV_LIVE_TEST.md)

## Development

### Installation

1. [Install API](api/README.md#Installation)
2. [Install Web](web/README.md#Installation)
3. [Install Hardhat](sol/README.md#Installation)
4. [Install Ganache - Truffle](sol-side-dev/README.md#Installation)

### Deployment

#### Deploy FW7 Token and FW7 Token Bridge
1. Start Hardhat.

`evm-token-bridge> cd sol`

`evm-token-bridge\sol> npx hardhat node`

2. Write down the first available account private key from the console. We will need it later.
```
Private Key: 0x...
```

3. Deploy FW7 Token and FW7 Token Bridge on Hadrhat node.

`evm-token-bridge> cd sol`
            
`evm-token-bridge\sol> npx hardhat run --network localhost scripts/deploy-fw7.ts`

4. Write down the contracts addresses from the console. We will need them later.
```
FW7Token deployed to: 0x...
FW7Bridge deployed to: 0x...
```

5. Copy the contracts json files if changed with the following powershell commands or execute `./copy_contracs.sh` in [wsl](https://docs.microsoft.com/en-us/windows/wsl/install).

`evm-token-bridge> copy sol\artifacts\contracts\FW7Token.sol\FW7Token.json web\src\constants\abis`

`evm-token-bridge> copy sol\artifacts\contracts\XFW7Token.sol\XFW7Token.json web\src\constants\abis`

`evm-token-bridge> copy sol\artifacts\contracts\FW7Bridge.sol\FW7Bridge.json web\src\constants\abis`

`evm-token-bridge> copy sol\artifacts\contracts\XFW7Bridge.sol\XFW7Bridge.json web\src\constants\abis`

`evm-token-bridge> copy sol\artifacts\contracts\Bridge.sol\Bridge.json sol-side-dev\contracts`

`evm-token-bridge> copy sol\artifacts\contracts\IToken.sol\IToken.json sol-side-dev\contracts`

`evm-token-bridge> copy sol\artifacts\contracts\XFW7Token.sol\XFW7Token.json sol-side-dev\contracts`

`evm-token-bridge> copy sol\artifacts\contracts\XFW7Bridge.sol\XFW7Bridge.json sol-side-dev\contracts`

`evm-token-bridge> copy sol\artifacts\contracts\FW7Bridge.sol\FW7Bridge.json api\abis`

`evm-token-bridge> copy sol\artifacts\contracts\XFW7Bridge.sol\XFW7Bridge.json api\abis`

6. Start Ganache.

`evm-token-bridge> cd sol-side-dev`

`evm-token-bridge\sol-side-dev> ganache-cli --networkId 4447 --chainId 2222 --port 7545`

7. Write down the first available account private key from the console. We will need it later.
```
Private Keys
==================
(0) 0x...
```

8. Deploy XFW7 Token and XFW7 Token Bridge on Ganache node.

`evm-token-bridge> cd sol-side-dev`
            
`evm-token-bridge\sol-side-dev> truffle migrate --reset`

9. Write down the contracts addresses from the console. We will need them later.
```
XFW7Token deployed to: 0x...
XFW7Bridge deployed to: 0x...
```

10. Set the API environment variables in `evm-token-bridge\api\.env` with the contracts addresses being deployed.
            
```Example
FW7_NODE_URL=http://localhost:8545
FW7_BRIDGE_CONTRACT_ADDRESS=// The bridge contract address from `step 4`
FW7_BRIDGE_CONTRACT_OWNER_WALLET_PRIVATE_KEY=// The private key from `step 2`
XFW7_NODE_URL=http://localhost:7545
XFW7_BRIDGE_CONTRACT_ADDRESS=// The bridge contract address from `step 9`
XFW7_BRIDGE_CONTRACT_OWNER_WALLET_PRIVATE_KEY=// The private key from `step 7`
GAS_LIMIT=6721975
```

Those owner wallet private keys are for Hardhat and Ganache local development test networks.

11. Start the Api
            
`evm-token-bridge> cd api`

`evm-token-bridge\api> npm run start:dev`

12. Set the React app environment variables in `evm-token-bridge\web\.env` with the contracts addresses being deployed.
            
```Example
REACT_APP_FW7_TOKEN_ADDRESS=// The token contract address from `step 4`
REACT_APP_FW7_BRIDGE_ADDRESS=// The bridge contract address from `step 4`
REACT_APP_XFW7_TOKEN_ADDRESS=// The token contract address from `step 9`
REACT_APP_XFW7_BRIDGE_ADDRESS=// The bridge contract address from `step 9`
REACT_APP_TRANSACTION_FEE_IN_ETH=0.005
```

13. Start the React App.
            
`evm-token-bridge> cd web`

`evm-token-bridge\web> yarn start`

14. Open the app [http://localhost:3000/](http://localhost:3000/).

15. Setup [Metamask by importing the both accounts](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account) for Hardhat and Ganache with the private keys from `step 2` and `step 7`.
  
16. Setup [Metamask by adding the both networks](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC) for Hardhat and Ganache.

```
Network Name: Hardhat localhost:8545
New RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
```

```
Network Name: Ganache localhost:7545
New RPC URL: http://127.0.0.1:7545
Chain ID: 2222
Currency Symbol: ETH
```

## Help
1. Reset [Metamask Account](https://support.avax.network/en/articles/4872721-metamask-transactions-are-stuck-rejected) if you get error similar to `Nonce too high` in the browser.

## License
[MIT](https://choosealicense.com/licenses/mit/)