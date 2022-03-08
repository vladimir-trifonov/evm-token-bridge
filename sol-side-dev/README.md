# XFW7 Token Bridge Ganache-Truffle (for development purposes)

This project is used for deploying the XFW7 smart contracts on a second chain for the purpose of local development.

## Installation

```bash
npm i
```

## Development
1. Start Ganache localhost node

`ganache-cli --networkId 4447 --chainId 2222 --port 7545`

2. Deploy XFW7 Token and XFW7 Token Bridge with truffle
            
`truffle migrate`

## License
[MIT](https://choosealicense.com/licenses/mit/)