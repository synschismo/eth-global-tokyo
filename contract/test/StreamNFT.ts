import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { Framework, SuperToken } from "@superfluid-finance/sdk-core";
import { deployTestFramework } from "@superfluid-finance/ethereum-contracts/dev-scripts/deploy-test-framework";
import TestToken from "@superfluid-finance/ethereum-contracts/build/contracts/TestToken.json";

let sf: Framework;
let dai: any;
let daix: SuperToken;

const thousandEther = ethers.utils.parseEther("10000")

before(async () => {
  const [owner, user1, user2] = await ethers.getSigners();

  const sfDeployer = await deployTestFramework();
  const contractsFramework = await sfDeployer.getFramework();
  sf = await Framework.create({
    chainId: 31337,
    provider: owner.provider,
    resolverAddress: contractsFramework.resolver,
    protocolReleaseVersion: "test"
  });

  const tokenDeployment = await sfDeployer.deployWrapperSuperToken(
    "Fake DAI Token",
    "fDAI",
    18,
    ethers.utils.parseEther("100000000").toString()
  );

  daix = await sf.loadSuperToken("fDAIx");
  if (daix.underlyingToken === undefined) throw new Error("daix.underlyingToken is undefined");
  dai = new ethers.Contract(daix.underlyingToken.address, TestToken.abi, owner);
});

describe("StreamNFT", () => {
  describe("Wallet", () => {
    it("deploy", async () => {
      const RentalStorage = await ethers.getContractFactory("RentalStorage");
      const rentalStorage = await RentalStorage.deploy();

      const Wallet = await ethers.getContractFactory("Wallet");
      await expect(Wallet.deploy(
        rentalStorage.address, // RentalStorage address
        sf.host.contract.address, // Superfluid host address
        dai.address, // DAI address
        daix.address // fDAIx address
      )).to.be.not.rejected;
    });

    describe("execute", () => {
      it("reverts renting NFT transfer");
      it("reverts listing NFT transfer");

      it("call RentalStorage.list");
      it("call RentalStorage.unList");
      it("call RentalStorage.rent");
    });

    it("returnRentItem");

    it("upgradeUSDCx");
    it("downgradeUSDCx");

    it("isValidSignature");
  });

  describe("WalletFactory", () => {
    it("createWallet");
  });

  describe("RentalStorage", () => {
    it("returnScheduledRent");
  });
});
