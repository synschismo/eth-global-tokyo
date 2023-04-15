import hre, { ethers } from "hardhat";

async function main() {
  const nftAddr = "0x56cc0d929714F2198bf0E3E8866c6AF792aD4041";
  const tokenId = 0;
  const rentalStorageAddr = "0x3D88436c1d23faabEc7B0BbEE794Ba638FF56129";
  const [lender] = await ethers.getSigners();

  const rentalStorage = await ethers.getContractAt("RentalStorage", rentalStorageAddr);

  const lenderWalletAddr = await rentalStorage.walletByOwner(lender.address);
  const lenderWallet = await ethers.getContractAt("Wallet", lenderWalletAddr);
  console.log(`Lender wallet address: ${lenderWallet.address} on ${hre.hardhatArguments.network}`);

  const callListData = rentalStorage.interface.encodeFunctionData("list", [nftAddr, tokenId, 1]);
  const ret = await lenderWallet.execute(rentalStorageAddr, 0, callListData);
  console.log(`RentalStorage.list Tx: ${ret.hash} on ${hre.hardhatArguments.network}`);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
