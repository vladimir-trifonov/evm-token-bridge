//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Bridge.sol";

contract XFW7Bridge is ReentrancyGuard, Bridge {
    constructor(address _token) Bridge(_token) {}

    function depositTokens(
        address _receiver,
        uint256 _amount,
        uint256 _deadline,
        uint8 _v,
        bytes32 _r,
        bytes32 _s
    ) external virtual nonReentrant {
        require(_receiver != address(0), "Wrong receiver");
        require(_amount > 0, "Insufficient tokens");
        token.permit(msg.sender, address(this), _amount, _deadline, _v, _r, _s);
        token.burnFrom(msg.sender, _amount);
        emit DepositTokens(msg.sender, _receiver, _amount);
    }

    function tokensBridged(
        address _receiver,
        uint256 _amount,
        bytes32 _otherChainTransactionHash
    ) external virtual onlyOwner {
        require(_receiver != address(0), "Wrong receiver");
        require(_amount > 0, "Insufficient tokens");
        require(
            processedHashes[_otherChainTransactionHash] == false,
            "Transfer already processed"
        );
        processedHashes[_otherChainTransactionHash] = true;
        bridged[_receiver] += _amount;
        require(bridged[_receiver] >= _amount, "Total bridged overflow");
        emit TokensBridged(_receiver, _amount, _otherChainTransactionHash);
    }

    function claimTokens() external virtual nonReentrant {
        uint256 amount = bridged[msg.sender];
        require(amount > 0, "Insufficient bridged tokens");
        delete bridged[msg.sender];
        token.mintTo(msg.sender, amount);
        emit ClaimTokens(msg.sender, amount);
    }

    function returnTokens(address _receiver) external virtual {
        require(_receiver != address(0), "Wrong receiver");
        uint256 amount = bridged[msg.sender];
        require(amount > 0, "Insufficient bridged tokens");
        delete bridged[msg.sender];
        emit ReturnTokens(msg.sender, _receiver, amount);
    }
}
