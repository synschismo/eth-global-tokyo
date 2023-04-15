// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "./IWallet.sol";

interface IWalletFactory {
  function rentalStorage() external view returns (address);

  function setRentalStorage(address _rentalStorage) external;

  function createWallet(
	  address _owner,
		uint256 _salt
	) external returns (IWallet wallet);

  function getAddress(
		address _owner,
		uint256 _salt
	) external view returns (address wallet);
}
