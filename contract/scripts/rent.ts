import hre, { ethers } from "hardhat";

async function main() {
  const nftAddr = "0x56cc0d929714F2198bf0E3E8866c6AF792aD4041";
  const tokenId = 0;
  const rentalStorageAddr = "0x3D88436c1d23faabEc7B0BbEE794Ba638FF56129";
  const [_lender, renter] = await ethers.getSigners();

  const rentalStorage = await ethers.getContractAt("RentalStorage", rentalStorageAddr);
  const lendId = await rentalStorage.lendIds(nftAddr, tokenId);
  console.log(`Lend ID: ${lendId} on ${hre.hardhatArguments.network}`);

  const renterWalletAddr = await rentalStorage.walletByOwner(renter.address);
  console.log(`Renter wallet address: ${renterWalletAddr} on ${hre.hardhatArguments.network}`);

  const renterWallet = await ethers.getContractAt("Wallet", renterWalletAddr);

  const callRentData = rentalStorage.interface.encodeFunctionData("rent", [lendId, 0]);
  const ret = await renterWallet.connect(renter).execute(rentalStorageAddr, 0, callRentData);
  console.log(`RentalStorage.rent Tx: ${ret.hash} on ${hre.hardhatArguments.network}`);
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
