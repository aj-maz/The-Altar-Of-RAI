const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

// Zero amount auction
const auction0 = {
  amountToSell: 0,
};

const auction1 = {
  amountToSell: 50000,
};

// AuctionObjectToArray
const aota = (auctionObject) => {
  return Object.values(auctionObject);
};

describe("AuctionHouse", function () {
  async function fixuture() {
    const pokeCooldown = 100;

    const [user1, altar] = await ethers.getSigners();

    const Sablier = await ethers.getContractFactory("Sablier");
    const sablier = await Sablier.deploy();

    const GPv2AllowListAuthentication = await ethers.getContractFactory(
      "GPv2AllowListAuthentication"
    );
    const gpv2Auth = await GPv2AllowListAuthentication.deploy();

    const GPv2Settlement = await ethers.getContractFactory("GPv2Settlement");
    const settlement = await GPv2Settlement.deploy(
      gpv2Auth.address,
      sablier.address
    );

    const cowRelayerAddress = await settlement.vaultRelayer();

    const LIT = await ethers.getContractFactory("LIT");
    const lit = await LIT.deploy();

    const FLX = await ethers.getContractFactory("FLX");
    const flx = await FLX.deploy();

    const AltarTreasury = await ethers.getContractFactory("AltarTreasury");
    const altarTreasury = await AltarTreasury.deploy(
      sablier.address,
      lit.address
    );

    const Altar = await ethers.getContractFactory("Altar");
    //const altar = await Altar.deploy(
    //  sablier.address,
    //  lit.address,
    //  flx.address,
    //  altarTreasury.address,
    //  pokeCooldown,
    //  settlement.address
    //);

    const litBalance = 5 * 1000 * 1000;
    const periode = 1000;

    await lit.mint(altarTreasury.address, litBalance);

    const AuctionHouse = await ethers.getContractFactory("AuctionHouse");
    const auctionHouse = await AuctionHouse.deploy(
      flx.address,
      lit.address,
      altar.address
    );

    await lit.mint(altar.address, litBalance);
    await lit
      .connect(altar)
      .approve(auctionHouse.address, ethers.constants.MaxUint256);

    return {
      sablier,
      lit,
      flx,
      altar,
      altarTreasury,
      litBalance,
      periode,
      pokeCooldown,
      cowRelayerAddress,
      settlement,
      auctionHouse,
      user1,
    };
  }

  describe("Deployment", function () {
    it("bid token must be right", async function () {
      const { flx, auctionHouse } = await loadFixture(fixuture);
      expect(await auctionHouse.bidToken()).to.equal(flx.address);
    });

    it("auctioned token must be right", async function () {
      const { lit, auctionHouse } = await loadFixture(fixuture);
      expect(await auctionHouse.auctionedToken()).to.equal(lit.address);
    });

    it("altar address must be right", async function () {
      const { altar, auctionHouse } = await loadFixture(fixuture);
      expect(await auctionHouse.altarAddress()).to.equal(altar.address);
    });
  });

  describe("Start auction", function () {
    it("Only altar can start auction", async function () {
      const { altar, auctionHouse } = await loadFixture(fixuture);
      await expect(
        auctionHouse.startAuction(...aota(auction1))
      ).to.be.revertedWith("unauthorized!");
      await expect(
        auctionHouse.connect(altar).startAuction(...aota(auction1))
      ).to.not.be.revertedWith("unauthorized!");
    });

    it("amount to sell must be > 0", async function () {
      const { altar, auctionHouse } = await loadFixture(fixuture);
      await expect(
        auctionHouse.connect(altar).startAuction(...aota(auction0))
      ).to.be.revertedWith("null-amount-sold");
      await expect(
        auctionHouse.connect(altar).startAuction(...aota(auction1))
      ).to.not.be.revertedWith("null-amount-sold");
    });

    it("auctions started must increase", async function () {
      const { altar, auctionHouse, lit } = await loadFixture(fixuture);
      await auctionHouse.connect(altar).startAuction(...aota(auction1));
      expect(await auctionHouse.auctionsStarted()).to.be.equal(1);
    });

    it("bid object must be proper", async function () {
      const { altar, auctionHouse } = await loadFixture(fixuture);
      await auctionHouse.connect(altar).startAuction(...aota(auction1));
      const bid = await auctionHouse.bids(1);
      expect(bid.bidAmount).to.be.equal(0);
      expect(bid.amountToSell).to.be.equal(auction1.amountToSell);
      expect(bid.highBidder).to.be.equal(altar.address);
      expect(bid.auctionDeadline).to.be.greaterThan(Number(new Date()) / 1000);
    });

    it("It must transfer lit from altar to auction house", async function () {
      const { altar, auctionHouse, lit } = await loadFixture(fixuture);
      expect(await lit.balanceOf(auctionHouse.address)).to.be.equal(0);
      await auctionHouse.connect(altar).startAuction(...aota(auction1));
      expect(await lit.balanceOf(auctionHouse.address)).to.be.equal(
        auction1.amountToSell
      );
    });

    it("It must emit start auction event", async function () {
      const { altar, auctionHouse } = await loadFixture(fixuture);

      await expect(
        auctionHouse.connect(altar).startAuction(...aota(auction1))
      ).to.emit(auctionHouse, "StartAuction");
    });
  });
});
