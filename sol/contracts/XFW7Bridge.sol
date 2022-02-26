//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./Bridge.sol";

contract XFW7Bridge is Bridge {
    constructor(address _token, address _gateway) Bridge(_token, _gateway) {}

    function depositTokens(uint256 _amount) external returns (bool) {
      token.burn(_amount);
      emit DepositTokens(msg.sender, _amount);
      return true;
    }

    function claimTokens() external returns (bool) {
        bytes memory accountRef = abi.encodePacked(msg.sender, token);
        uint256 amount = bridget[accountRef];
        require(amount > 0, "Insufficient bridged tokens");
        delete bridget[accountRef];
        token.mint(msg.sender, amount);
        emit ClaimTokens(msg.sender, amount);
        return true;
    }

    function tokensBridged (address _requester, uint256 _amount, bytes32 _mainDepositHash) external onlyGateway returns (bool) {
        bytes memory accountRef = abi.encodePacked(msg.sender, token);
        bridget[accountRef] += _amount;
        require(bridget[accountRef] >= _amount, "Total bridget overflow");
        emit TokensBridged(_requester, _mainDepositHash, _amount);
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
