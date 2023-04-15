import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { Framework, SuperToken } from "@superfluid-finance/sdk-core";
import { deployTestFramework } from "@superfluid-finance/ethereum-contracts/dev-scripts/deploy-test-framework";
import TestToken from "@superfluid-finance/ethereum-contracts/build/contracts/TestToken.json";

let sf: Framework;
let dai: any;
let daix: SuperToken;

before(async () => {
  const [owner] = await ethers.getSigners();

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
  const deployContractsFixture = async () => {
    const [owner, user1, user2] = await ethers.getSigners();

    const RentalStorage = await ethers.getContractFactory("RentalStorage");
    const rentalStorage = await RentalStorage.deploy();

    const WalletFactory = await ethers.getContractFactory("WalletFactory");
    const walletFactory = await WalletFactory.deploy(
      rentalStorage.address,
      sf.host.contract.address,
      dai.address,
      daix.address
    );
    await rentalStorage.setWalletFactory(walletFactory.address);

    const Wallet = await ethers.getContractFactory("Wallet");

    const TestERC721 = await ethers.getContractFactory("TestERC721");
    const testERC721 = await TestERC721.deploy();

    await walletFactory.createWallet(owner.address);
    const ownerWallet = Wallet.attach(await rentalStorage.walletByOwner(owner.address));

    return {
      owner, user1, user2,
      ownerWallet,
      RentalStorage, rentalStorage,
      WalletFactory, walletFactory,
      Wallet,
      TestERC721, testERC721,
    }
  };

  describe("Wallet", () => {
    it("deploy", async () => {
      const {owner, rentalStorage} = await loadFixture(deployContractsFixture);

      const Wallet = await ethers.getContractFactory("Wallet");
      await expect(Wallet.deploy(
        owner.address,
        rentalStorage.address, // RentalStorage address
        sf.host.contract.address, // Superfluid host address
        dai.address, // DAI address
        daix.address // fDAIx address
      )).to.be.not.rejected;
    });

    describe("execute", () => {
      it("reverts renting NFT transfer");

      it("reverts listing NFT transfer");

      it("call RentalStorage.list", async () => {
        const {
          ownerWallet,
          rentalStorage,
          testERC721,
        } = await loadFixture(deployContractsFixture);

        await testERC721.mint(ownerWallet.address, 1);
        expect(await testERC721.ownerOf(1)).to.be.equal(ownerWallet.address);

        const callData = rentalStorage.interface.encodeFunctionData("list", [
          testERC721.address,
          1,
          1,
        ]);

        await expect(ownerWallet.execute(rentalStorage.address, 0, callData)).to.be.not.reverted;

        const lendId = await rentalStorage.lendIds(testERC721.address, 1);
        expect(lendId).to.be.not.equal(0);
        const lendInfo = await rentalStorage.lendInfoList(lendId);
        expect(lendInfo.lenderWallet).to.be.equal(ownerWallet.address);
        expect(lendInfo.tokenAddress).to.be.equal(testERC721.address);
        expect(lendInfo.tokenId).to.be.equal(1);

        await expect(ownerWallet.execute(rentalStorage.address, 0, callData)).to.be.reverted;
      });

      it("call RentalStorage.unList");

      it("call RentalStorage.rent");
    });

    it("returnRentItem");

    it("upgrade and downgrade USDCx", async () => {
      const {owner, ownerWallet} = await loadFixture(deployContractsFixture);
      expect(await dai.balanceOf(ownerWallet.address)).to.be.equal(0);
      await dai.mint(ownerWallet.address, 10000);
      expect(await dai.balanceOf(ownerWallet.address)).to.be.equal(10000);

      expect(await daix.balanceOf({account: ownerWallet.address, providerOrSigner: owner})).to.be.equal("0");
      await expect(ownerWallet.upgradeUSDCx(5000)).to.be.not.rejected;
      expect(await daix.balanceOf({account: ownerWallet.address, providerOrSigner: owner})).to.be.equal("5000");
      expect(await dai.balanceOf(ownerWallet.address)).to.be.equal(5000);

      await expect(ownerWallet.downgradeUSDCx(3000)).to.be.not.reverted;
      expect(await daix.balanceOf({account: ownerWallet.address, providerOrSigner: owner})).to.be.equal("2000");
      expect(await dai.balanceOf(ownerWallet.address)).to.be.equal(8000);
    });

    it("isValidSignature");
  });

  describe("WalletFactory", () => {
    it("createWallet", async () => {
      // const {owner, rentalStorage, walletFactory, Wallet} = await loadFixture(deployContractsFixture);
      const [owner] = await ethers.getSigners();
      const RentalStorage = await ethers.getContractFactory("RentalStorage");
      const rentalStorage = await RentalStorage.deploy();

      const WalletFactory = await ethers.getContractFactory("WalletFactory");
      const walletFactory = await WalletFactory.deploy(
        rentalStorage.address,
        sf.host.contract.address,
        dai.address,
        daix.address
      );
      await rentalStorage.setWalletFactory(walletFactory.address);

      const Wallet = await ethers.getContractFactory("Wallet");

      expect(await rentalStorage.walletByOwner(owner.address)).to.be.equal(ethers.constants.AddressZero);

      await expect(walletFactory.createWallet(owner.address)).to.be.not.reverted;

      const walletAddr = await rentalStorage.walletByOwner(owner.address);
      expect(walletAddr).to.be.not.equal(ethers.constants.AddressZero);
      expect(await rentalStorage.ownerByWallet(walletAddr)).to.be.equal(owner.address);

      const wallet = Wallet.attach(walletAddr);
      expect(await wallet.owner()).to.be.equal(owner.address);
    });
  });

  describe("RentalStorage", () => {
    it("returnScheduledRent");
  });
});
