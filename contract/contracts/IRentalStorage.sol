// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

interface IRentalStorage {
  function registerWallet(address _owner, address _wallet) external;

  function ownerByWallet(address _wallet) external view returns (address owner);
  function walletByOwner(address _owner) external view returns (address wallet);

  function validateExecution(
    address _to,
    bytes calldata _data
  ) external view returns (bool);

  function onReturned(uint256 _rentId) external;
}
