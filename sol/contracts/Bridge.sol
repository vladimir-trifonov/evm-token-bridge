//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IToken.sol";

abstract contract Bridge is Ownable {
    IToken public token;
    address public gateway;
    mapping(bytes => uint256) public bridget;

    event DepositTokens(address indexed sender, uint256 _amount);
    event ReturnTokens(address indexed sender, uint _amount);
    event ClaimTokens(address indexed sender, uint256 _amount);

    event TokensBridged(address indexed sender, bytes32 indexed mainDepositHash, uint _amount);

    modifier onlyGateway {
      require(msg.sender == gateway, "Only bridge can execute");
      _;
    }

    constructor(address _token, address _gateway) {
      token = IToken(_token);
      gateway = _gateway;
    }

    function gatewayUpdate(address _gateway) external onlyOwner {
      require(_gateway != address(0), "Don't burn the bridge");
      gateway = _gateway;
    }

    fallback() external payable {
      revert("Don't accept any Ether");
    }

    receive() external payable {
      revert("Don't accept any Ether");
    }
}
