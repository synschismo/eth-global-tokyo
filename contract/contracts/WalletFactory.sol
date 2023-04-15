// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IWalletFactory.sol";

contract WalletFactory is IWalletFactory, Ownable {
  address public rentalStorage;

  function setRentalStorage(address _rentalStorage) external onlyOwner {
    rentalStorage = _rentalStorage;
  }

  function createWallet(
	  address _owner,
		uint256 _salt
	) external returns (IWallet wallet) {
    revert("TODO");
  }

  function getAddress(
		address _owner,
		uint256 _salt
	) external view returns (address wallet) {
    revert("TODO");
  }
}
