import hre, { ethers } from "hardhat";

async function main() {
  const superfluidHostAddr = "0xEB796bdb90fFA0f28255275e16936D25d3418603";
  const feeTokenAddr = "0xbe49ac1EadAc65dccf204D4Df81d650B50122aB2";
  const feeSuperTokenAddr = "0x42bb40bF79730451B11f6De1CbA222F17b87Afd7";

  const RentalStorage = await ethers.getContractFactory("RentalStorage");
  const rentalStorage = await RentalStorage.deploy();

  console.log(`RentalStorage deployed to ${rentalStorage.address} on ${hre.hardhatArguments.network}`);

  const WalletFactory = await ethers.getContractFactory("WalletFactory");
  const walletFactory = await WalletFactory.deploy(
    rentalStorage.address,
    superfluidHostAddr,
    feeTokenAddr,
    feeSuperTokenAddr
  );

  console.log(`WalletFactory deployed to ${walletFactory.address} on ${hre.hardhatArguments.network}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
