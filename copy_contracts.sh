#!/bin/bash

cp ./sol/artifacts/contracts/FW7Token.sol/FW7Token.json ./web/src/constants/abis
cp ./sol/artifacts/contracts/XFW7Token.sol/XFW7Token.json ./web/src/constants/abis
cp ./sol/artifacts/contracts/FW7Bridge.sol/FW7Bridge.json ./web/src/constants/abis
cp ./sol/artifacts/contracts/XFW7Bridge.sol/XFW7Bridge.json ./web/src/constants/abis

cp ./sol/artifacts/contracts/FW7Bridge.sol/FW7Bridge.json ./api/abis
cp ./sol/artifacts/contracts/XFW7Bridge.sol/XFW7Bridge.json ./api/abis

cp ./sol/contracts/Bridge.sol ./sol-side-dev/contracts
cp ./sol/contracts/IToken.sol ./sol-side-dev/contracts
cp ./sol/contracts/XFW7Token.sol ./sol-side-dev/contracts
cp ./sol/contracts/XFW7Bridge.sol ./sol-side-dev/contracts