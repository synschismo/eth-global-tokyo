// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestERC721 is ERC721, Ownable {
  constructor() ERC721("TestERC721", "TE") {}

  function mint(address _to, uint256 _tokenId) external onlyOwner {
    _mint(_to, _tokenId);
  }
}
