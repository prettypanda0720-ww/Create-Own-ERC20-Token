//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract PPToken is ERC20 {
    constructor(string memory name, string memory symbol, uint256 _totalSupply) ERC20(name, symbol) {
        console.log('caller address', msg.sender);
        _mint(msg.sender, _totalSupply);
    }

    function mintPPT(address account, uint256 amount) external{
        require(amount >= 5000, "can't exchange more than 5000ETH");
        _mint(account, amount);
    }
}   