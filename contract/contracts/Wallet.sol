// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {ISuperfluid, ISuperToken, SuperAppDefinitions} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";
import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";
import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";
import {SuperAppBase} from "@superfluid-finance/ethereum-contracts/contracts/apps/SuperAppBase.sol";

import "./IRentalStorage.sol";
import "./IWallet.sol";
import {CommonTypes} from "./CommonTypes.sol";

contract Wallet is SuperAppBase, Ownable, IWallet {
  using ECDSA for bytes32;
  using Address for address;

  IRentalStorage public rentalStorage;
  modifier onlyRentalStorage {
    require(msg.sender == address(rentalStorage), "Wallet: only RentalStorage can call this function");
    _;
  }

  // TODO: multi rent
  uint256 public activeRentId;

  using CFAv1Library for CFAv1Library.InitData;
  CFAv1Library.InitData public cfaV1;               //initialize cfaV1 variable

  modifier onlySuperfluidHost() {
      if (msg.sender != address(cfaV1.host)) revert("Wallet: not superfluid host");
      _;
  }

  IERC20 public usdc;
  ISuperToken public usdcX;

  constructor (
    address _owner,
    IRentalStorage _rentalStorage,
    ISuperfluid _hostSuperfluid,
    IERC20 _usdc,
    ISuperToken _usdcX
  ) {
    transferOwnership(_owner);
    rentalStorage = _rentalStorage;
    usdc = _usdc;
    usdcX = _usdcX;
    cfaV1 = CFAv1Library.InitData(
      _hostSuperfluid,
      IConstantFlowAgreementV1(
        address(_hostSuperfluid.getAgreementClass(
          keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
        ))
      )
    );

    // handle `afterAgreementTerminated` only
    _hostSuperfluid.registerApp(
        SuperAppDefinitions.APP_LEVEL_FINAL |
            SuperAppDefinitions.BEFORE_AGREEMENT_CREATED_NOOP |
            SuperAppDefinitions.AFTER_AGREEMENT_CREATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_UPDATED_NOOP |
            SuperAppDefinitions.AFTER_AGREEMENT_UPDATED_NOOP |
            SuperAppDefinitions.BEFORE_AGREEMENT_TERMINATED_NOOP
    );
  }

  function execute(
    address _to,
    uint256 _value,
    bytes calldata _data
  ) external onlyOwner override {
    // check lend/rent item approve/transfer/burn
    require(rentalStorage.validateExecution(_to, _data), "Wallet: denied execution");
    require(_to != address(cfaV1.host), "Wallet: cannot call Superfluid directory");

    (bool success, ) = _to.call{value: _value}(_data);
    require(success, "Wallet: Transaction failed");
  }

  function upgradeUSDCx(uint256 _amount) external onlyOwner {
    usdc.approve(address(usdcX), _amount);
    usdcX.upgrade(_amount);
  }

  function downgradeUSDCx(uint256 _amount) external onlyOwner {
    usdcX.downgrade(_amount);
  }

  function returnRentItem(uint256 _rentId) external onlyOwner {
    _returnRentItem(_rentId);
  }

  function returnRentItemByOrg(uint256 _rentId) external onlyRentalStorage {
    _returnRentItem(_rentId);
  }

  function _returnRentItem(uint256 _rentId) internal {
    require(activeRentId == _rentId, "Wallet: not active rent");

    CommonTypes.RentInfo memory rentInfo = rentalStorage.getRentInfo(_rentId);
    require(rentInfo.renterWallet == address(this), "Wallet: not renter");
    CommonTypes.LendInfo memory lendInfo = rentalStorage.getLendInfo(rentInfo.lendId);

    // stop superflow
    cfaV1.deleteFlow(address(this), lendInfo.lenderWallet, usdcX);

    // transfer
    try IERC721(rentInfo.tokenAddress).safeTransferFrom(address(this), lendInfo.lenderWallet, rentInfo.tokenId) {
    } catch Error(string memory reason) {
      revert(reason);
    }

    rentalStorage.onReturned(_rentId);

    // reset active rent status
    activeRentId = 0;
  }

  // callback for renter
  function onRent(uint256 _rentId, address _lenderWallet, int96 flowRate) external onlyRentalStorage {
    require(activeRentId == 0, "Wallet: only support one rent at a time");

    // configure superfluid
    cfaV1.createFlow(_lenderWallet, usdcX, flowRate);

    activeRentId = _rentId;
  }

  // callback for lender
  function onLend(address _renterWallet, address _tokenAddress, uint256 _tokenId) external onlyRentalStorage {
    // transfer
    try IERC721(_tokenAddress).safeTransferFrom(address(this), _renterWallet, _tokenId) {
    } catch Error(string memory reason) {
      revert(reason);
    }
  }

  function afterAgreementTerminated(
    ISuperToken _superToken,
    address _agreementClass,
    bytes32, // _agreementId,
    bytes calldata, // _agreementData
    bytes calldata, // _cbdata,
    bytes calldata _ctx
  ) external override onlySuperfluidHost returns (bytes memory newCtx) {
    if (activeRentId == 0 || _superToken != usdcX || _agreementClass != address(cfaV1.host)) {
        return _ctx;
    }

    _returnRentItem(activeRentId);

    return _ctx;
  }

  function onERC721Received(address, address, uint256, bytes calldata) external override returns (bytes4) {
    return this.onERC721Received.selector;
  }

  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature
  ) public view override returns (bytes4) {
    address signer = _hash.recover(_signature);
    if (owner() == signer) {
      return IERC1271.isValidSignature.selector;
    } else {
      return 0xffffffff;
    }
  }

  receive() external payable {}
}
