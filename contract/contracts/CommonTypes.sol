// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

library CommonTypes {
  struct LendInfo {
    address lenderWallet;
    address tokenAddress;
    uint256 tokenId;
    int96 flowRate;
  }

  struct RentInfo {
    uint256 lendId;
    address tokenAddress;
    uint256 tokenId;
    address renterWallet;
    uint256 startedAt;
    uint256 returnAt;
  }
}
