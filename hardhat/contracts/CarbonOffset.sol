// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CarbonOffset is ERC20 {
    address public owner;

    constructor() ERC20("Carbon Offset", "COFF") {
        owner = msg.sender;
    }

    function setNewOwner(address _newOwner) external {
        require(msg.sender == owner, "Only owner");
        owner = _newOwner;
    }
    
    function mint(address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner");
        _mint(to, amount * 10 ** decimals());
    }
    
    function retire(address to, uint256 amount) public {
        require(msg.sender == owner, "Only owner");
        _burn(to, amount * 10 ** decimals());
    }
}
