import hre, { ethers } from "hardhat";

async function main() {
  const rentalStorageAddr = "0xb0C505617Bef01f8f5DA49Db28EA8d040bF95b40";
  const walletFactoryAddr = "0xA4126FA7918b03a1F809084b50cD89AeD4E648B5";
  const [owner] = await ethers.getSigners();

  const rentalStorage = await ethers.getContractAt("RentalStorage", rentalStorageAddr);
  const walletFactory = await ethers.getContractAt("WalletFactory", walletFactoryAddr);

  const beforeOwnerWalletAddr = await rentalStorage.walletByOwner(owner.address);
  if (beforeOwnerWalletAddr !== ethers.constants.AddressZero) {
    console.log(`Owner wallet already deployed to ${beforeOwnerWalletAddr} on ${hre.hardhatArguments.network}`);
  }

  await walletFactory.createWallet(owner.address);
  const ownerWalletAddr = await rentalStorage.walletByOwner(owner.address);
  console.log(`Owner wallet deployed to ${ownerWalletAddr} on ${hre.hardhatArguments.network}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
