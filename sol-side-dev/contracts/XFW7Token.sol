//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract XFW7Token is ERC20Permit, ERC20Burnable, Ownable {
    address public gateway;

    constructor() ERC20("XFW7Token", "XFW7") ERC20Permit("XFW7Token") {}

    modifier onlyGateway() {
        require(msg.sender == gateway, "Only bridge can execute");
        _;
    }

    function gatewayUpdate(address _gateway) external onlyOwner {
        require(_gateway != address(0), "Don't abandon the bridge");
        gateway = _gateway;
    }

    function mintTo(address recipient, uint256 amount) external onlyGateway {
        _mint(recipient, amount);
    }
}
