# XFW7 Token Bridge Live Test - Ropsten/Rinkeby Flow

### Installation

1. [Install API](api/README.md#Installation)
2. [Install Web](web/README.md#Installation)
3. [Install Hardhat](sol/README.md#Installation)
4. [Infura account](https://infura.io/))

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

2. Compile the contracts

`evm-token-bridge> cd sol`
   
`evm-token-bridge> npx hardhat compile`

3. Deploy FW7 Token and FW7 Token Bridge on Ropsten.
            
`evm-token-bridge\sol> npx hardhat run --network ropsten scripts/deploy-fw7.ts`

4. Write down the contracts addresses from the console. We will need them later.
```
FW7Token deployed to: 0x...
FW7Bridge deployed to: 0x...
```

**Verify contracts deployment(Require: ETHERSCAN_API_KEY in .env)**
- Verify FW7Token deployment:  `npx hardhat verify --network ropsten <FW7_TOKEN_ADDRESS>`
- Verify FW7Bridge deployment: `npx hardhat verify --network ropsten <FW7_BRIDGE_ADDRESS> "<FW7_TOKEN_ADDRESS>"`

5. Deploy XFW7 Token and XFW7 Token Bridge on Rinkeby.

`evm-token-bridge> cd sol`
            
`evm-token-bridge\sol> npx hardhat run --network rinkeby scripts/deploy-xfw7.ts`

6. Write down the contracts addresses from the console. We will need them later.
```
XFW7Token deployed to: 0x...
XFW7Bridge deployed to: 0x...
```

**Verify contracts deployment(Require: ETHERSCAN_API_KEY in .env)**
- Verify XFW7Token deployment:  `npx hardhat verify --network rinkeby <XFW7_TOKEN_ADDRESS>`
- Verify XFW7Bridge deployment: `npx hardhat verify --network rinkeby <XFW7_BRIDGE_ADDRESS> "<XFW7_TOKEN_ADDRESS>"`

7. (Optional) To copy the contracts json files if changed execute `evm-token-bridge> ./copy_contracts.sh`.

8. Set the API environment variables in `evm-token-bridge\api\.env` with the contracts addresses being deployed.
            
```Example
FW7_NODE_URL=wss://ropsten.infura.io/ws/v3/<INFURA_ID>
FW7_BRIDGE_CONTRACT_ADDRESS=// The bridge contract address from `step 4`
FW7_BRIDGE_CONTRACT_OWNER_WALLET_PRIVATE_KEY=// The account eth wallet private key
XFW7_NODE_URL=wss://rinkeby.infura.io/ws/v3/<INFURA_ID>
XFW7_BRIDGE_CONTRACT_ADDRESS=// The bridge contract address from `step 6`
XFW7_BRIDGE_CONTRACT_OWNER_WALLET_PRIVATE_KEY=// The account eth wallet private key
```

The owner wallet private key can be retrieved from Metamask.

9. Start the Api
            
`evm-token-bridge> cd api`

`evm-token-bridge\api> npm start`

10. Set the React app environment variables in `evm-token-bridge\web\.env` with the contracts addresses being deployed.
            
```Example
REACT_APP_FW7_TOKEN_ADDRESS=// The token contract address from `step 4`
REACT_APP_FW7_BRIDGE_ADDRESS=// The bridge contract address from `step 4`
REACT_APP_XFW7_TOKEN_ADDRESS=// The token contract address from `step 6`
REACT_APP_XFW7_BRIDGE_ADDRESS=// The bridge contract address from `step 6`
```

11. Start the React App.
            
`evm-token-bridge> cd web`

`evm-token-bridge\web> yarn start`