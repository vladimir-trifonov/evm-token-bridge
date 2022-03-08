#!/bin/bash

cp ./sol/artifacts/contracts/FW7Token.sol/FW7Token.json ./web/src/constants/abis
cp ./sol/artifacts/contracts/XFW7Token.sol/XFW7Token.json ./web/src/constants/abis
cp ./sol/artifacts/contracts/FW7Bridge.sol/FW7Bridge.json ./web/src/constants/abis
cp ./sol/artifacts/contracts/XFW7Bridge.sol/XFW7Bridge.json ./web/src/constants/abis

cp ./sol/artifacts/contracts/Bridge.sol/Bridge.json ./sol-side-dev/contracts
cp ./sol/artifacts/contracts/IToken.sol/IToken.json ./sol-side-dev/contracts
cp ./sol/artifacts/contracts/XFW7Token.sol/XFW7Token.json ./sol-side-dev/contracts
cp ./sol/artifacts/contracts/XFW7Bridge.sol/XFW7Bridge.json ./sol-side-dev/contracts

cp ./sol/artifacts/contracts/FW7Bridge.sol/FW7Bridge.json ./api/abis
cp ./sol/artifacts/contracts/XFW7Bridge.sol/XFW7Bridge.json ./api/abis