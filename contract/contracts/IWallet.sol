// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@account-abstraction/contracts/interfaces/IAccount.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";
import "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperApp.sol";

interface IWallet is IERC1271, IERC721Receiver {
  function execute(
    address _to,
    uint256 _value,
    bytes calldata data
  ) external;

  function returnRentItem(uint256 _rentId) external;

  function returnRentItemByOrg(uint256 _rentId) external;

  function onRent(uint256 _rentId, address _lenderWallet, int96 flowRate) external;

  function onLend(address _renterWallet, address _tokenAddress, uint256 _tokenId) external;
}
