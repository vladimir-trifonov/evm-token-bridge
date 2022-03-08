//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IToken.sol";

abstract contract Bridge is Ownable {
    IToken public token;
    mapping(address => uint256) public bridged;
    mapping(bytes32 => bool) public processedHashes;

    event DepositTokens(
        address indexed _sender,
        address indexed _receiver,
        uint256 _amount
    );
    event TokensBridged(
        address indexed _receiver,
        uint256 _amount,
        bytes32 _otherChainTransactionHash
    );
    event ReturnTokens(
        address indexed _sender,
        address indexed _receiver,
        uint256 _amount
    );
    event ClaimTokens(address indexed _sender, uint256 _amount);

    constructor(address _token) {
        token = IToken(_token);
    }

    fallback() external payable {
        revert("Don't accept any Ether");
    }

    receive() external payable {
        revert("Don't accept any Ether");
    }
}
