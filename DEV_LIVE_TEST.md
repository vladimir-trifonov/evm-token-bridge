# XFW7 Token Bridge Live Test - Ropsten/Rinkeby Flow

### Installation

1. [Install API](api/README.md#Installation)
2. [Install Web](web/README.md#Installation)
3. [Install Hardhat](sol/README.md#Installation)

### Deployment

#### Deploy FW7 Token and FW7 Token Bridge
1. Set the Ropsten and Rinkeby environment variables in `evm-token-bridge\sol\.env`.
            
```Example
ETHERSCAN_API_KEY=// Optional
ROPSTEN_URL=https://ropsten.infura.io/v3/<INFURA_ID>
RINKEBY_URL=https://rinkeby.infura.io/v3/<INFURA_ID>
PRIVATE_KEY=// The account eth wallet private key
```

The owner wallet private key can be retrieved from Metamask.

2. Deploy FW7 Token and FW7 Token Bridge on Ropsten.

`evm-token-bridge> cd sol`
            
`evm-token-bridge\sol> npx hardhat run --network ropsten scripts/deploy-fw7.ts`

3. Write down the contracts addresses from the console. We will need them later.
```
FW7Token deployed to: 0x...
FW7Bridge deployed to: 0x...
```

**Optional: Verify contracts deployment(Require: ETHERSCAN_API_KEY in .env)**
- Verify FW7Token deployment:  `npx hardhat verify --network ropsten <FW7_TOKEN_ADDRESS>`
- Verify FW7Bridge deployment: `npx hardhat verify --network ropsten <FW7_BRIDGE_ADDRESS> "<FW7_TOKEN_ADDRESS>"`

4. Deploy XFW7 Token and XFW7 Token Bridge on Rinkeby.

`evm-token-bridge> cd sol`
            
`evm-token-bridge\sol> npx hardhat run --network rinkeby scripts/deploy-xfw7.ts`

5. Write down the contracts addresses from the console. We will need them later.
```
XFW7Token deployed to: 0x...
XFW7Bridge deployed to: 0x...
```

**Optional: Verify contracts deployment(Require: ETHERSCAN_API_KEY in .env)**
- Verify XFW7Token deployment:  `npx hardhat verify --network rinkeby <XFW7_TOKEN_ADDRESS>`
- Verify XFW7Bridge deployment: `npx hardhat verify --network rinkeby <XFW7_BRIDGE_ADDRESS> "<XFW7_TOKEN_ADDRESS>"`

6. Copy the contracts json files if changed with the following powershell commands or execute `./copy_contracs.sh` in [wsl](https://docs.microsoft.com/en-us/windows/wsl/install).

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

7. Set the API environment variables in `evm-token-bridge\api\.env` with the contracts addresses being deployed.
            
```Example
FW7_NODE_URL=wss://ropsten.infura.io/ws/v3/<INFURA_ID>
FW7_BRIDGE_CONTRACT_ADDRESS=// The bridge contract address from `step 3`
FW7_BRIDGE_CONTRACT_OWNER_WALLET_PRIVATE_KEY=// The account eth wallet private key
XFW7_NODE_URL=wss://rinkeby.infura.io/ws/v3/<INFURA_ID>
XFW7_BRIDGE_CONTRACT_ADDRESS=// The bridge contract address from `step 5`
XFW7_BRIDGE_CONTRACT_OWNER_WALLET_PRIVATE_KEY=// The account eth wallet private key
GAS_LIMIT=6721975
```

The owner wallet private key can be retrieved from Metamask.

8. Start the Api
            
`evm-token-bridge> cd api`

`evm-token-bridge\api> npm start`

9. Set the React app environment variables in `evm-token-bridge\web\.env` with the contracts addresses being deployed.
            
```Example
REACT_APP_FW7_TOKEN_ADDRESS=// The token contract address from `step 3`
REACT_APP_FW7_BRIDGE_ADDRESS=// The bridge contract address from `step 3`
REACT_APP_XFW7_TOKEN_ADDRESS=// The token contract address from `step 5`
REACT_APP_XFW7_BRIDGE_ADDRESS=// The bridge contract address from `step 5`
REACT_APP_TRANSACTION_FEE_IN_ETH=0.005
```

10. Start the React App.
            
`evm-token-bridge> cd web`

`evm-token-bridge\web> yarn start`

11.  Open the app [http://localhost:3000/](http://localhost:3000/).