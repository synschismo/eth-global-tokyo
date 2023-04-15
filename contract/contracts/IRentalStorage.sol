// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import {CommonTypes} from "./CommonTypes.sol";

interface IRentalStorage {
  function registerWallet(address _owner, address _wallet) external;

  function ownerByWallet(address _wallet) external view returns (address owner);
  function walletByOwner(address _owner) external view returns (address wallet);

  function getLendInfo(uint256 _lendId) external view returns (CommonTypes.LendInfo memory lendInfo);
  function getRentInfo(uint256 _rentId) external view returns (CommonTypes.RentInfo memory rentInfo);

  function validateExecution(
    address _to,
    bytes calldata _data
  ) external view returns (bool);

  function onReturned(uint256 _rentId) external;
}
