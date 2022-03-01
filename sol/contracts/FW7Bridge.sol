//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Bridge.sol";
import "hardhat/console.sol";

contract FW7Bridge is Bridge {
    uint256 public locked;

    constructor(address _token, address _gateway) Bridge(_token, _gateway) {}

    function depositTokens(uint256 _amount) public returns (bool) {
      require(_amount > 0, "Insufficient tokens");
      locked += _amount;
      require(locked >= _amount, "Total locked overflow");
      require(token.transferFrom(msg.sender, address(this), _amount), "Failed to transfer");
      emit DepositTokens(msg.sender, _amount);
      return true;
    }

     function tokensBridged (address _requester, uint256 _amount, bytes32 _sideDepositHash) external onlyGateway returns (bool) {
        bytes memory accountRef = abi.encodePacked(msg.sender, token);
        bridget[accountRef] += _amount;
        require(bridget[accountRef] >= _amount, "Total bridget overflow");
        emit TokensBridged(_requester, _sideDepositHash, _amount);
        return true;
    }

    function claimTokens() external returns (bool) {
        bytes memory accountRef = abi.encodePacked(msg.sender, token);
        uint256 amount = bridget[accountRef];
        require(amount > bridget[accountRef], "Insufficient bridged tokens");
        delete bridget[accountRef];
        require(amount > locked, "Insufficient locked tokens");
        locked -= amount;
        require(token.transferFrom(address(this), msg.sender, amount), "Failed to transfer");
        emit ClaimTokens(msg.sender, amount);
        return true;
    }

    function returnTokens () external returns (bool) {
        bytes memory accountRef = abi.encodePacked(msg.sender, token);
        uint256 amount = bridget[accountRef];
        delete bridget[accountRef];
        emit ReturnTokens(msg.sender, amount);
        return true;
    }
}
