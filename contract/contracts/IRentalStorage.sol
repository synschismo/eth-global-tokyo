// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import {CommonTypes} from "./CommonTypes.sol";

interface IRentalStorage {
  function registerWallet(address _owner, address _wallet) external;

  function ownerByWallet(address _wallet) external view returns (address owner);
  function walletByOwner(address _owner) external view returns (address wallet);

  function getLendInfo(uint256 _lendId) external view returns (CommonTypes.LendInfo memory lendInfo);
  function getRentInfo(uint256 _rentId) external view returns (CommonTypes.RentInfo memory rentInfo);

  function list(
    address _tokenAddress,
    uint256 _tokenId,
    int96 _flowRate
  ) external returns (uint256 lendId);

  function unList(uint256 _lendId) external;

  function returnScheduledRent(uint256 _rentId) external;

  // callback from Wallet
  function onReturned(uint256 _rentId) external;

  function validateExecution(
    address _to,
    bytes calldata _data
  ) external view returns (bool);
}
