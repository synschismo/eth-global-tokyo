import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

import { Framework, SuperToken } from "@superfluid-finance/sdk-core";
import { deployTestFramework } from "@superfluid-finance/ethereum-contracts/dev-scripts/deploy-test-framework";
import TestToken from "@superfluid-finance/ethereum-contracts/build/contracts/TestToken.json";

describe("StreamNFT", () => {
  const deployContractsFixture = async () => {
    const [owner, user1, user2] = await ethers.getSigners();

    const sfDeployer = await deployTestFramework();
    const contractsFramework = await sfDeployer.getFramework();
    const sf = await Framework.create({
      chainId: 31337,
      provider: owner.provider,
      resolverAddress: contractsFramework.resolver,
      protocolReleaseVersion: "test"
    });

    const tokenDeployment = await sfDeployer.deployWrapperSuperToken(
      "Fake DAI Token",
      "fDAI",
      18,
      ethers.utils.parseEther("1000000000000").toString()
    );

    const daix = await sf.loadSuperToken("fDAIx");
    if (daix.underlyingToken === undefined) throw new Error("daix.underlyingToken is undefined");
    const dai = new ethers.Contract(daix.underlyingToken.address, TestToken.abi, owner);

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
    await walletFactory.createWallet(user1.address);
    await walletFactory.createWallet(user2.address);
    const ownerWallet = Wallet.attach(await rentalStorage.walletByOwner(owner.address));
    const user1Wallet = Wallet.attach(await rentalStorage.walletByOwner(user1.address));
    const user2Wallet = Wallet.attach(await rentalStorage.walletByOwner(user2.address));

    return {
      sf, dai, daix,
      owner, user1, user2,
      ownerWallet, user1Wallet, user2Wallet,
      RentalStorage, rentalStorage,
      WalletFactory, walletFactory,
      Wallet,
      TestERC721, testERC721,
    }
  };

  describe("Wallet", () => {
    it("deploy", async () => {
      const {sf, dai, daix, owner, rentalStorage} = await loadFixture(deployContractsFixture);

      const Wallet = await ethers.getContractFactory("Wallet");
      await expect(Wallet.deploy(
        owner.address,
        rentalStorage.address, // RentalStorage address
        sf.host.contract.address, // Superfluid host address
        dai.address, // DAI address
        daix.address // fDAIx address
      )).to.be.not.rejected;
    });

    it("main ux", async () => {
      const {
        sf, dai, daix,
        owner, user1, user2,
        ownerWallet, user1Wallet, user2Wallet,
        rentalStorage,
        testERC721,
      } = await loadFixture(deployContractsFixture);

      await testERC721.mint(ownerWallet.address, 1);
      expect(await testERC721.ownerOf(1)).to.be.equal(ownerWallet.address);

      // ==========================
      // list
      // ==========================
      const listCallData = rentalStorage.interface.encodeFunctionData("list", [
        testERC721.address, // token address
        1, // token id
        1, // flow rate
      ]);

      await expect(ownerWallet.execute(rentalStorage.address, 0, listCallData)).to.be.not.reverted;

      const lendId = await rentalStorage.lendIds(testERC721.address, 1);
      expect(lendId).to.be.not.equal(0);
      const lendInfo = await rentalStorage.lendInfoList(lendId);
      expect(lendInfo.lenderWallet).to.be.equal(ownerWallet.address);
      expect(lendInfo.tokenAddress).to.be.equal(testERC721.address);
      expect(lendInfo.tokenId).to.be.equal(1);

      await expect(ownerWallet.execute(rentalStorage.address, 0, listCallData)).to.be.reverted;

      // ==========================
      // rent & unList
      // ==========================
      const rentCallData = rentalStorage.interface.encodeFunctionData("rent", [lendId]);

      await dai.mint(user1Wallet.address, 100000000000);
      await expect(user1Wallet.connect(user1).upgradeUSDCx(8000000000)).to.be.not.reverted;
      expect(await daix.balanceOf({account: user1Wallet.address, providerOrSigner: user1})).to.be.equal("8000000000");

      await expect(user1Wallet.connect(user1).execute(rentalStorage.address, 0, rentCallData)).to.be.not.reverted;
      expect(await testERC721.ownerOf(1)).to.be.equal(user1Wallet.address);
      const rentId = await rentalStorage.rentIds(testERC721.address, 1);
      expect(rentId).to.be.not.equal(0);
      const rentInfo = await rentalStorage.rentInfoList(rentId);
      expect(rentInfo.renterWallet).to.be.equal(user1Wallet.address);
      expect(rentInfo.tokenAddress).to.be.equal(testERC721.address);
      expect(rentInfo.tokenId).to.be.equal(1);

      // cannot rent an item that is already rented
      await dai.mint(user2Wallet.address, 1000000);
      await expect(user2Wallet.connect(user2).upgradeUSDCx(80000)).to.be.not.reverted;
      expect(await daix.balanceOf({account: user2Wallet.address, providerOrSigner: user2})).to.be.equal("80000");
      await expect(user2Wallet.connect(user2).execute(rentalStorage.address, 0, rentCallData)).to.be.reverted;

      // cannot unlist when rented
      const unListCallData = rentalStorage.interface.encodeFunctionData("unList", [lendId]);
      await expect(ownerWallet.execute(rentalStorage.address, 0, unListCallData)).to.be.reverted;

      // return renting item
      await expect(user1Wallet.connect(user1).returnRentItem(rentId)).to.be.not.reverted;
      expect(await testERC721.ownerOf(1)).to.be.equal(ownerWallet.address);
      expect(await rentalStorage.rentIds(testERC721.address, 1)).to.be.equal(0);

      // unlist
      await expect(ownerWallet.execute(rentalStorage.address, 0, unListCallData)).to.be.not.reverted;
      expect(await rentalStorage.lendIds(testERC721.address, 1)).to.be.equal(0);
    });

    describe("execute", () => {
      it("reverts renting NFT transfer");

      it("reverts listing NFT transfer");
    });

    it("upgrade and downgrade USDCx", async () => {
      const {dai, daix, owner, ownerWallet} = await loadFixture(deployContractsFixture);
      expect(await dai.balanceOf(ownerWallet.address)).to.be.equal(0);
      await dai.mint(ownerWallet.address, 10000);
      expect(await dai.balanceOf(ownerWallet.address)).to.be.equal(10000);

      expect(await daix.balanceOf({account: ownerWallet.address, providerOrSigner: owner})).to.be.equal("0");
      await expect(ownerWallet.upgradeUSDCx(5000)).to.be.not.reverted;
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
      const {
        sf, dai, daix,
      } = await loadFixture(deployContractsFixture);
      const [_owner, _user1, _user2, owner] = await ethers.getSigners();

      const RentalStorage = await ethers.getContractFactory("RentalStorage");
      const rentalStorage = await RentalStorage.connect(owner).deploy();

      const WalletFactory = await ethers.getContractFactory("WalletFactory");
      const walletFactory = await WalletFactory.connect(owner).deploy(
        rentalStorage.address,
        sf.host.contract.address,
        dai.address,
        daix.address
      );
      await rentalStorage.connect(owner).setWalletFactory(walletFactory.address);

      const Wallet = await ethers.getContractFactory("Wallet");

      expect(await rentalStorage.walletByOwner(owner.address)).to.be.equal(ethers.constants.AddressZero);

      await expect(walletFactory.connect(owner).createWallet(owner.address)).to.be.not.reverted;

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
