// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

import "./WalletFactory.sol";
import "./Wallet.sol";
import "./IRentalStorage.sol";
import {CommonTypes} from "./CommonTypes.sol";

import "hardhat/console.sol";

contract RentalStorage is Ownable, IRentalStorage {
  WalletFactory walletFactory;

  function setWalletFactory(WalletFactory _walletFactory) external onlyOwner {
    walletFactory = _walletFactory;
  }

  modifier onlyWalletFactory {
    require(msg.sender == address(walletFactory), "Only wallet factory");
    _;
  }

  mapping(address wallet => address owner) public ownerByWallet;
  mapping(address owner => address wallet) public walletByOwner;

  modifier onlyRegisteredWallet() {
    require(ownerByWallet[msg.sender] != address(0), "Wallet: not registered");
    _;
  }

  function registerWallet(
    address _owner,
    address _wallet
  ) external onlyWalletFactory {
    require(walletByOwner[_owner] == address(0), "Wallet: already registered wallet");
    require(ownerByWallet[_wallet] == address(0), "Wallet: already registered owner");
    ownerByWallet[_wallet] = _owner;
    walletByOwner[_owner] = _wallet;
  }

  uint256 lendNonce;
  uint256 rentNonce;

  mapping(address tokenAddress => mapping(uint256 tokenId => uint256 lendId)) public lendIds;
  mapping(address tokenAddress => mapping(uint256 tokenId => uint256 rentId)) public rentIds;
  mapping(uint256 lendId => CommonTypes.LendInfo) public lendInfoList;
  mapping(uint256 rentId => CommonTypes.RentInfo) public rentInfoList;

  function getLendInfo(uint256 _lendId) external view override returns (CommonTypes.LendInfo memory lendInfo) {
    lendInfo = lendInfoList[_lendId];
  }

  function getRentInfo(uint256 _rentId) external view override returns (CommonTypes.RentInfo memory rentInfo) {
    rentInfo = rentInfoList[_rentId];
  }

  function validateExecution(
    address _to,
    bytes calldata _data
  ) external view override returns (bool) {
    // parse _data and detect selector (approve/transfer/burn) and tokenId

    return true;
  }

  function list(
    address tokenAddress,
    uint256 tokenId,
    int96 flowRate
  ) external onlyRegisteredWallet returns (uint256 lendId) {
    require(flowRate > 0, "Wallet: feePerSec must be greater than 0");

    lendId = ++lendNonce;

    require(lendIds[tokenAddress][tokenId] == 0, "Wallet: item is already listing");

    lendIds[tokenAddress][tokenId] = lendId;
    lendInfoList[lendId] = CommonTypes.LendInfo(
      msg.sender,
      tokenAddress,
      tokenId,
      flowRate
    );

    return lendId;
  }

  function unList(uint256 lendId) external onlyRegisteredWallet {
    // check rent status
    CommonTypes.LendInfo memory lendInfo = lendInfoList[lendId];
    require(lendInfo.lenderWallet != address(0), "Wallet: lendId not found");
    uint256 rentId = rentIds[lendInfo.tokenAddress][lendInfo.tokenId];
    require(rentId == 0, "Wallet: item is rented now");

    require(lendInfo.lenderWallet == msg.sender, "Wallet: not item owner");

    // reset lend status
    delete lendIds[lendInfo.tokenAddress][lendInfo.tokenId];
    delete lendInfoList[lendId];
  }

  function rent(uint256 lendId) external onlyRegisteredWallet returns (uint256 rentId) {
    Wallet renterWallet = Wallet(payable(msg.sender));

    CommonTypes.LendInfo memory lendInfo = lendInfoList[lendId];
    require(lendInfo.lenderWallet != address(0), "Wallet: lendId not found");
    require(lendIds[lendInfo.tokenAddress][lendInfo.tokenId] == lendId, "Wallet: lendId not found");

    rentId = ++rentNonce;

    // transfer item from lender to renter and configure fee
    Wallet lenderWallet = Wallet(payable(lendInfo.lenderWallet));

    try renterWallet.onRent(rentId, address(lenderWallet), lendInfo.flowRate) {
    } catch Error(string memory reason) {
      revert(reason);
    }
    try lenderWallet.onLend(address(renterWallet), lendInfo.tokenAddress, lendInfo.tokenId) {
    } catch Error(string memory reason) {
      revert(reason);
    }

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

  function onReturned(uint256 _rentId) external onlyRegisteredWallet {
    // check nft owner
    CommonTypes.RentInfo memory rentInfo = rentInfoList[_rentId];
    require(rentInfo.renterWallet != address(0), "Wallet: rentId not found");
    CommonTypes.LendInfo memory lendInfo = lendInfoList[rentInfo.lendId];
    require(lendInfo.lenderWallet != address(0), "Wallet: lendId not found");

    require(
      IERC721(rentInfo.tokenAddress).ownerOf(rentInfo.tokenId) == lendInfo.lenderWallet,
      "RentalStorage: item is not returned"
    );

    // reset rental status
    delete rentIds[rentInfoList[_rentId].tokenAddress][rentInfoList[_rentId].tokenId];
    delete rentInfoList[_rentId];
  }
}
