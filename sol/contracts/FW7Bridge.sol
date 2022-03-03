//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Bridge.sol";

contract FW7Bridge is Bridge {
    uint256 public locked;
    uint256 fee = 0.1 ether;

    constructor(address _token) Bridge(_token) {}

    function depositTokens(address _receiver, uint256 _amount) public payable {
      require(msg.value >= fee, "Insufficient fee");
      require(_amount > 0, "Insufficient tokens");
      locked += _amount;
      require(locked >= _amount, "Total locked overflow");
      require(token.transferFrom(msg.sender, address(this), _amount), "Failed to transfer");
      emit DepositTokens(msg.sender, _receiver, _amount);
    }

     function tokensBridged (address _receiver, uint256 _amount, bytes32 _otherChainTransactionHash) external onlyOwner {
        require(_amount > 0, "Insufficient tokens");
        require(processedHashes[_otherChainTransactionHash] == false, "Transfer already processed");
        processedHashes[_otherChainTransactionHash] = true;
        bridged[_receiver] += _amount;
        require(bridged[_receiver] >= _amount, "Total bridged overflow");
        emit TokensBridged(_receiver, _amount, _otherChainTransactionHash);
    }

    function claimTokens() external payable {
        require(msg.value >= fee, "Insufficient fee");
        uint256 amount = bridged[msg.sender];
        require(amount > 0, "Insufficient tokens");
        require(locked >= amount, "Insufficient locked tokens");
        locked -= amount;
        delete bridged[msg.sender];
        require(token.transfer(msg.sender, amount), "Failed to transfer");
        emit ClaimTokens(msg.sender, amount);
    }

    function returnTokens (address _receiver) external payable {
        require(msg.value >= fee, "Insufficient fee");
        uint256 amount = bridged[msg.sender];
        require(amount > 0, "Insufficient bridged tokens");
        delete bridged[msg.sender];
        emit ReturnTokens(msg.sender, _receiver, amount);
    }
}
