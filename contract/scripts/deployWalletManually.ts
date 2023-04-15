import hre, { ethers } from "hardhat";

async function main() {
  const rentalStorageAddr = "0x3D88436c1d23faabEc7B0BbEE794Ba638FF56129";
  const superfluidHostAddr = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
  const feeTokenAddr = "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2";
  const feeSuperTokenAddr = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7";
  const [_owner, owner] = await ethers.getSigners();

  console.log(`Owner address: ${owner.address} on ${hre.hardhatArguments.network}`);

  const rentalStorage = await ethers.getContractAt("RentalStorage", rentalStorageAddr);

  const Wallet = await ethers.getContractFactory("Wallet");
  const wallet = await Wallet.deploy(
    owner.address,
    rentalStorageAddr,
    superfluidHostAddr,
    feeTokenAddr,
    feeSuperTokenAddr,
  );

  console.log(`Wallet deployed to ${wallet.address} on ${hre.hardhatArguments.network}`);

  await rentalStorage.registerWallet(owner.address, wallet.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
