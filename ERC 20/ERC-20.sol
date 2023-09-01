//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract ShardeumERC20Token is ERC20 {
   constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol){
       _mint(msg.sender, 10000 * 10 ** 18);

   }

   function mint(uint256 _amount) public{
       _mint(msg.sender, _amount);
   }

   function burn(uint256 _amount) public {
       require(balanceOf(msg.sender) >= _amount, "Cannot burn more tokens than your balance!");
       _burn(msg.sender, _amount);
   }
}