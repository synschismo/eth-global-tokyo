// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

interface IRentalStorage {
  function validateExecution(
    address _to,
    bytes calldata _data
  ) external view returns (bool);

  function onReturned(uint256 _rentId) external;
}
