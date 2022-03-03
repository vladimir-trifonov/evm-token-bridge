//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IToken.sol";

abstract contract Bridge is Ownable {
    IToken public token;
    mapping(address => uint256) public bridged;
    mapping(bytes32 => bool) public processedHashes;

    event DepositTokens(address indexed receiver, uint256 _amount);
    event ReturnTokens(address indexed sender, uint _amount);
    event ClaimTokens(address indexed sender, uint256 _amount);
    event TokensBridged(address indexed _receiver, uint _amount, bytes32 _otherChainTransactionHash);

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
