// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonOffset is ERC20, Ownable {
    constructor() ERC20("Carbon Offset", "COFF") Ownable(msg.sender) {}
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount * 10 ** decimals());  // e.g., amount=100 for 100 tons
    }
    
    function retire(uint256 amount) public {
        _burn(msg.sender, amount * 10 ** decimals());  // Retire by burning
        // Emit event for HCS logging (integrate via HIP-478)
    }
}
