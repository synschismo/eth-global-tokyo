// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@account-abstraction/contracts/interfaces/IAccount.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";

interface IWallet is IERC1271, IERC721Receiver {
  function execute(
    address _to,
    uint256 _value,
    bytes calldata data
  ) external;
}
