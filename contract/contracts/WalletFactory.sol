// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import "./IRentalStorage.sol";
import "./Wallet.sol";

contract WalletFactory is Ownable {
  Wallet public immutable walletImplementation;

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
    walletImplementation = new Wallet(
      _rentalStorage,
      _hostSuperfluid,
      _feeToken,
      _feeTokenX
    );
  }

  function createWallet(address owner) external returns (Wallet wallet) {
    address addr = getAddress(owner);
    uint codeSize = addr.code.length;
    if (codeSize > 0) {
      return Wallet(payable(addr));
    }
    return Wallet(payable(new ERC1967Proxy{salt : bytes32(salt)}(
      address(walletImplementation),
      abi.encodeCall(Wallet.initialize, (owner))
    )));
  }

  function getAddress(address owner) public view returns (address wallet) {
    return Create2.computeAddress(bytes32(salt), keccak256(abi.encodePacked(
      type(ERC1967Proxy).creationCode,
      abi.encode(
        address(walletImplementation),
        abi.encodeCall(Wallet.initialize, (owner))
      )
    )));
  }
}
