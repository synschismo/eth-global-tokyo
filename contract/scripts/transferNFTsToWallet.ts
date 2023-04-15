import hre, { ethers } from "hardhat";

async function main() {
  const nftAddr = "0x56cc0d929714F2198bf0E3E8866c6AF792aD4041";
  const tokenId = 0;
  const rentalStorageAddr = "0x3D88436c1d23faabEc7B0BbEE794Ba638FF56129";
  const [owner] = await ethers.getSigners();

  const rentalStorage = await ethers.getContractAt("RentalStorage", rentalStorageAddr);

  const ownerWalletAddr = await rentalStorage.walletByOwner(owner.address);
  const ownerWallet = await ethers.getContractAt("Wallet", ownerWalletAddr);
  console.log(`Owner wallet address: ${ownerWallet.address} on ${hre.hardhatArguments.network}`);


  const nft = await ethers.getContractAt("ERC721", nftAddr);
  if (await nft.ownerOf(tokenId) !== owner.address) {
    console.log(`Owner of token ${tokenId} is not ${owner.address} on ${nftAddr} (${hre.hardhatArguments.network})`);
    return;
  }

  await nft["safeTransferFrom(address,address,uint256)"](owner.address, ownerWallet.address, tokenId);
  console.log("done");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
