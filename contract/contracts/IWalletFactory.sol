// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "./IRentalStorage.sol";
import "./Wallet.sol";

interface IWalletFactory {
  function createWallet(address _owner) external returns (Wallet wallet);
}
