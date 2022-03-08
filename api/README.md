# XFW7 Token Bridge API

The API listens for `DepositTokens` and `ReturnTokens` smart contracts events being triggered by FW7 Token Bridge and XFW7 Token Bridge and handles them accordingly. 

## Installation

```bash
npm i
```

## Development
1. Set the environment variables in `.env`

```env
FW7_NODE_URL=
FW7_BRIDGE_CONTRACT_ADDRESS=
FW7_BRIDGE_CONTRACT_OWNER_WALLET_PRIVATE_KEY=
XFW7_NODE_URL=
XFW7_BRIDGE_CONTRACT_ADDRESS=
XFW7_BRIDGE_CONTRACT_OWNER_WALLET_PRIVATE_KEY=
```
2. Start the process
            
`npm run start:dev`

## License
[MIT](https://choosealicense.com/licenses/mit/)