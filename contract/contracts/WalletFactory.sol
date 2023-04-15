// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import "./IRentalStorage.sol";
import "./Wallet.sol";
import "./IWalletFactory.sol";

contract WalletFactory is IWalletFactory, Ownable {
  uint256 constant public salt = 1234;

  IRentalStorage immutable public rentalStorage;
  ISuperfluid immutable public hostSuperfluid;
  IERC20 immutable public feeToken;
  ISuperToken immutable public feeTokenX;

  constructor(
    IRentalStorage _rentalStorage,
    ISuperfluid _hostSuperfluid,
    IERC20 _feeToken,
    ISuperToken _feeTokenX
  ) {
    rentalStorage = _rentalStorage;
    hostSuperfluid = _hostSuperfluid;
    feeToken = _feeToken;
    feeTokenX = _feeTokenX;
  }

  function createWallet(address owner) external override returns (Wallet wallet) {
    wallet = new Wallet(
      owner,
      rentalStorage,
      hostSuperfluid,
      feeToken,
      feeTokenX
    );
    rentalStorage.registerWallet(owner, address(wallet));
    return wallet;
  }
}
