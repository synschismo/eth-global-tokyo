// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./WalletFactory.sol";
import "./Wallet.sol";
import "./IRentalStorage.sol";
import {CommonTypes} from "./CommonTypes.sol";

contract RentalStorage is Ownable, IRentalStorage {
  WalletFactory walletFactory;

  function setWalletFactory(WalletFactory _walletFactory) external onlyOwner {
    walletFactory = _walletFactory;
  }

  modifier onlyWalletFactory {
    require(msg.sender == address(walletFactory), "Only wallet factory");
    _;
  }

  mapping(address wallet => address owner) ownerByWallet;

  function registerWallet(
    address _owner,
    address _wallet
  ) external onlyWalletFactory {
    ownerByWallet[_wallet] = _owner;
  }

  uint256 lendNonce;
  uint256 rentNonce;

  mapping(address tokenAddress => mapping(uint256 tokenId => uint256 lendId)) public lendIds;
  mapping(address tokenAddress => mapping(uint256 tokenId => uint256 rentId)) public rentIds;
  mapping(uint256 lendId => CommonTypes.LendInfo) public lendInfoList;
  mapping(uint256 rentId => CommonTypes.RentInfo) public rentInfoList;

  function validateExecution(
    address _to,
    bytes calldata _data
  ) external view override returns (bool) {
    // parse _data and detect selector (approve/transfer/burn) and tokenId
    revert("TODO");
  }

  function list(
    address tokenAddress,
    uint256 tokenId,
    uint256 feePerSec
  ) external onlyWalletFactory returns (uint256 lendId) {
    lendId = ++lendNonce;

    // todo: check item is not registered

    lendIds[tokenAddress][tokenId] = lendId;
    lendInfoList[lendId] = CommonTypes.LendInfo(
      msg.sender,
      tokenAddress,
      tokenId,
      feePerSec
    );

    return lendId;
  }

  function unList(uint256 lendId) external {
    // TODO: check rent status
    // TODO: check item owner
    // TODO: reset lend status
    revert("TODO");
  }

  function rent(uint256 lendId) external returns (uint256 rentId) {
    Wallet renterWallet = Wallet(payable(msg.sender));
    // todo: check registered wallets
    // todo: check item is listed

    rentId = ++rentNonce;

    CommonTypes.LendInfo memory lendInfo = lendInfoList[lendId];
    require(lendInfo.lenderWallet != address(0), "Wallet: lendId not found");

    // transfer item from lender to renter and configure fee
    Wallet lenderWallet = Wallet(payable(lendInfo.lenderWallet));
    lenderWallet.onLend(address(renterWallet), lendInfo.tokenAddress, lendInfo.tokenId);

    rentIds[lendInfo.tokenAddress][lendInfo.tokenId] = rentId;
    rentInfoList[rentId] = CommonTypes.RentInfo(
      lendId,
      lendInfo.tokenAddress,
      lendInfo.tokenId,
      address(renterWallet),
      block.timestamp
    );

    return rentId;
  }

  function returnScheduledRent(uint256 rentId) external onlyOwner {
    // TODO
  }

  function onReturned(uint256 _rentId) external {
    // TODO: check nft owner

    // TODO: reset rental status
  }
}
