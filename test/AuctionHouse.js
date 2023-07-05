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

const bidEr = {
  id: 5,
  bidAmount: ethers.utils.parseEther("1"),
};

const bid1 = {
  id: 1,
  bidAmount: ethers.utils.parseEther("2"),
};

const bid1_2 = {
  id: 1,
  bidAmount: ethers.utils.parseEther("2.5"),
};

const bid1_3 = {
  id: 1,
  bidAmount: ethers.utils.parseEther("3"),
};

// Object to array helper
const aota = (auctionObject) => {
  return Object.values(auctionObject);
};

describe("AuctionHouse", function() {
  async function fixuture() {
    const pokeCooldown = 100;

    const [user1, altar, bidder, bidder2] = await ethers.getSigners();

    const Sablier = await ethers.getContractFactory("Sablier");
    const sablier = await Sablier.deploy();

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

    const litBalance = ethers.utils.parseEther("3");
    const flxBalance = ethers.utils.parseEther("10");
    const periode = 1000;

    await lit.mint(altarTreasury.address, litBalance);

    const AuctionHouse = await ethers.getContractFactory("AuctionHouse");
    const auctionHouse = await AuctionHouse.deploy(flx.address, lit.address);

    await auctionHouse.initialize(altar.address);

    await lit.mint(altar.address, litBalance);
    await lit
      .connect(altar)
      .approve(auctionHouse.address, ethers.constants.MaxUint256);

    await flx.mint(bidder.address, flxBalance);
    await flx
      .connect(bidder)
      .approve(auctionHouse.address, ethers.constants.MaxUint256);

    await flx.mint(bidder2.address, flxBalance);
    await flx
      .connect(bidder2)
      .approve(auctionHouse.address, ethers.constants.MaxUint256);

    return {
      sablier,
      lit,
      flx,
      altar,
      altarTreasury,
      litBalance,
      flxBalance,
      periode,
      pokeCooldown,
      cowRelayerAddress,
      settlement,
      auctionHouse,
      user1,
      bidder,
      bidder2,
    };
  }

  async function fixutureWithAuction() {
    const fixtureObject = await fixuture();
    const { auctionHouse, flx, flxBalance, altar } = fixtureObject;
    auctionHouse.connect(altar).startAuction(...aota(auction1));
    await flx.mint(auctionHouse.address, flxBalance);
    await flx.mint(auctionHouse.address, flxBalance);
    return { ...fixtureObject };
  }

  async function fixutureWithBiddedAuction() {
    const fixtureObject = await fixutureWithAuction();
    const { auctionHouse, bidder } = fixtureObject;
    await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1));
    return { ...fixtureObject };
  }

  async function fixutureForWithdraw() {
    const fixtureObject = await fixutureWithAuction();
    const { auctionHouse, bidder, bidder2 } = fixtureObject;
    await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1));
    await auctionHouse.connect(bidder2).increaseBidSize(...aota(bid1_3));
    return { ...fixtureObject };
  }

  describe("Deployment", function() {
    it("bid token must be right", async function() {
      const { flx, auctionHouse } = await loadFixture(fixuture);
      expect(await auctionHouse.bidToken()).to.equal(flx.address);
    });

    it("auctioned token must be right", async function() {
      const { lit, auctionHouse } = await loadFixture(fixuture);
      expect(await auctionHouse.auctionedToken()).to.equal(lit.address);
    });

    it("altar address must be right", async function() {
      const { altar, auctionHouse } = await loadFixture(fixuture);
      expect(await auctionHouse.altarAddress()).to.equal(altar.address);
    });
  });

  describe("Start auction", function() {
    it("Only altar can start auction", async function() {
      const { altar, auctionHouse } = await loadFixture(fixuture);
      await expect(
        auctionHouse.startAuction(...aota(auction1))
      ).to.be.revertedWith("unauthorized!");
      await expect(
        auctionHouse.connect(altar).startAuction(...aota(auction1))
      ).to.not.be.revertedWith("unauthorized!");
    });

    it("amount to sell must be > 0", async function() {
      const { altar, auctionHouse } = await loadFixture(fixuture);
      await expect(
        auctionHouse.connect(altar).startAuction(...aota(auction0))
      ).to.be.revertedWith("null-amount-sold");
      await expect(
        auctionHouse.connect(altar).startAuction(...aota(auction1))
      ).to.not.be.revertedWith("null-amount-sold");
    });

    it("auctions started must increase", async function() {
      const { altar, auctionHouse, lit } = await loadFixture(fixuture);
      await auctionHouse.connect(altar).startAuction(...aota(auction1));
      expect(await auctionHouse.auctionsStarted()).to.be.equal(1);
    });

    it("bid object must be proper", async function() {
      const { altar, auctionHouse } = await loadFixture(fixuture);
      await auctionHouse.connect(altar).startAuction(...aota(auction1));
      const bid = await auctionHouse.bids(1);
      expect(bid.bidAmount).to.be.equal(0);
      expect(bid.amountToSell).to.be.equal(auction1.amountToSell);
      expect(bid.highBidder).to.be.equal(altar.address);
      expect(bid.auctionDeadline).to.be.greaterThan(Number(new Date()) / 1000);
    });

    it("It must transfer lit from altar to auction house", async function() {
      const { altar, auctionHouse, lit } = await loadFixture(fixuture);
      expect(await lit.balanceOf(auctionHouse.address)).to.be.equal(0);
      await auctionHouse.connect(altar).startAuction(...aota(auction1));
      expect(await lit.balanceOf(auctionHouse.address)).to.be.equal(
        auction1.amountToSell
      );
    });

    it("It must emit start auction event", async function() {
      const { altar, auctionHouse } = await loadFixture(fixuture);

      await expect(
        auctionHouse.connect(altar).startAuction(...aota(auction1))
      ).to.emit(auctionHouse, "StartAuction");
    });
  });

  describe("Increase bid size", function() {
    it("it check if the bid existed", async function() {
      const { auctionHouse, bidder } = await loadFixture(fixutureWithAuction);
      await expect(
        auctionHouse.connect(bidder).increaseBidSize(...aota(bidEr))
      ).to.be.revertedWith("high-bidder-not-set");
    });

    it("it check if auction is not expired", async function() {
      const { auctionHouse, bidder } = await loadFixture(fixutureWithAuction);
      await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1));
      const sevenDays = 7 * 24 * 60 * 60;
      await ethers.provider.send("evm_increaseTime", [sevenDays]);
      await ethers.provider.send("evm_mine");
      await expect(
        auctionHouse.connect(bidder).increaseBidSize(...aota(bid1))
      ).to.be.revertedWith("auction-already-expired");
    });

    it("it check if bid amount is increased sufficiently", async function() {
      const { auctionHouse, bidder } = await loadFixture(fixutureWithAuction);
      await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1));
      await expect(
        auctionHouse.connect(bidder).increaseBidSize(...aota(bid1))
      ).to.be.revertedWith("insufficient-increase");
    });

    it("it check auction house balance after bid for token transfer", async function() {
      const { auctionHouse, bidder, flx } = await loadFixture(
        fixutureWithAuction
      );
      const auctionHouseBalanceBefore = await flx.balanceOf(
        auctionHouse.address
      );
      await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1));
      const auctionHouseBalanceAfter = await flx.balanceOf(
        auctionHouse.address
      );

      expect(auctionHouseBalanceAfter.sub(auctionHouseBalanceBefore)).to.equal(
        bid1.bidAmount
      );
    });

    it("it check bidder balance after getting outbidded", async function() {
      const { auctionHouse, bidder, bidder2 } = await loadFixture(
        fixutureWithAuction
      );

      await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1));
      await auctionHouse.connect(bidder2).increaseBidSize(...aota(bid1_2));

      expect(await auctionHouse.bidTokenBalances(bidder.address)).to.equal(
        bid1.bidAmount
      );
    });

    it("it check bidder balance if he already have balances available", async function() {
      const { auctionHouse, bidder, bidder2, flx } = await loadFixture(
        fixutureWithAuction
      );

      await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1));
      await auctionHouse.connect(bidder2).increaseBidSize(...aota(bid1_2));
      const beforeBalance = await flx.balanceOf(bidder.address);
      await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1_3));
      const afterBalance = await flx.balanceOf(bidder.address);
      expect(await auctionHouse.bidTokenBalances(bidder.address)).to.equal(0);
      expect(beforeBalance.sub(afterBalance)).to.equal(
        bid1_3.bidAmount.sub(bid1.bidAmount)
      );
    });

    it("it check bidder balance after outbidding himself", async function() {
      const { auctionHouse, bidder, flx } = await loadFixture(
        fixutureWithAuction
      );

      const auctionHouseBalanceBefore = await flx.balanceOf(
        auctionHouse.address
      );

      await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1));
      await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1_2));
      expect(await auctionHouse.bidTokenBalances(bidder.address)).to.equal(0);
      const auctionHouseBalanceAfter = await flx.balanceOf(
        auctionHouse.address
      );
      expect(auctionHouseBalanceAfter.sub(auctionHouseBalanceBefore)).to.equal(
        bid1_2.bidAmount
      );
    });

    it("it check new bid information", async function() {
      const { auctionHouse, bidder, bidder2 } = await loadFixture(
        fixutureWithAuction
      );

      await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1));
      const bid = await auctionHouse.bids(1);
      expect(bid.bidAmount).to.equal(bid1.bidAmount);
      expect(bid.highBidder).to.equal(bidder.address);
      await auctionHouse.connect(bidder2).increaseBidSize(...aota(bid1_2));
      const bid2 = await auctionHouse.bids(1);
      expect(bid2.bidAmount).to.equal(bid1_2.bidAmount);
      expect(bid2.highBidder).to.equal(bidder2.address);
    });
    it("it check emittion of IncreaseBidSizeEvent", async function() {
      const { auctionHouse, bidder } = await loadFixture(fixutureWithAuction);

      await expect(
        auctionHouse.connect(bidder).increaseBidSize(...aota(bid1))
      ).to.emit(auctionHouse, "IncreaseBidSize");
    });
  });

  describe("Settle auction", function() {
    it("It must check if the auction is actually finished", async function() {
      const { auctionHouse, bidder } = await loadFixture(fixutureWithAuction);

      const sevenDays = 7 * 24 * 60 * 60;
      await ethers.provider.send("evm_increaseTime", [sevenDays]);
      await ethers.provider.send("evm_mine");

      await expect(auctionHouse.settleAuction(1)).to.be.revertedWith(
        "not-finished"
      );
    });

    it("It must check if the auction is actually finished", async function() {
      const { auctionHouse, bidder } = await loadFixture(fixutureWithAuction);

      await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1_2));

      await expect(auctionHouse.settleAuction(1)).to.be.revertedWith(
        "not-finished"
      );
    });

    it("It must check if the auction is already settled", async function() {
      const { auctionHouse, bidder } = await loadFixture(
        fixutureWithBiddedAuction
      );
      const sevenDays = 7 * 24 * 60 * 60;
      await ethers.provider.send("evm_increaseTime", [sevenDays]);
      await ethers.provider.send("evm_mine");

      await auctionHouse.settleAuction(1);

      await expect(auctionHouse.settleAuction(1)).to.be.revertedWith(
        "already-settled"
      );
    });

    it("It must check proper auctioned token transfer", async function() {
      const { auctionHouse, bidder, lit } = await loadFixture(
        fixutureWithBiddedAuction
      );
      const beforeBalanceBidder = await lit.balanceOf(bidder.address);
      const sevenDays = 7 * 24 * 60 * 60;
      await ethers.provider.send("evm_increaseTime", [sevenDays]);
      await ethers.provider.send("evm_mine");

      //bid1
      await auctionHouse.settleAuction(1);
      const afterBalanceBidder = await lit.balanceOf(bidder.address);

      expect(afterBalanceBidder.sub(beforeBalanceBidder)).to.equal(
        auction1.amountToSell
      );
    });

    it("It must check proper bidding token transfer", async function() {
      const { auctionHouse, flx, altar } = await loadFixture(
        fixutureWithBiddedAuction
      );
      const beforeBalanceBidder = await flx.balanceOf(altar.address);
      const sevenDays = 7 * 24 * 60 * 60;
      await ethers.provider.send("evm_increaseTime", [sevenDays]);
      await ethers.provider.send("evm_mine");

      //bid1
      await auctionHouse.settleAuction(1);
      const afterBalanceBidder = await flx.balanceOf(altar.address);

      expect(afterBalanceBidder.sub(beforeBalanceBidder)).to.equal(
        bid1.bidAmount
      );
    });

    it("It must check emittion of SettleAuction event", async function() {
      const { auctionHouse, flx, altar } = await loadFixture(
        fixutureWithBiddedAuction
      );
      const beforeBalanceBidder = await flx.balanceOf(altar.address);
      const sevenDays = 7 * 24 * 60 * 60;
      await ethers.provider.send("evm_increaseTime", [sevenDays]);
      await ethers.provider.send("evm_mine");

      await expect(auctionHouse.settleAuction(1)).to.emit(
        auctionHouse,
        "SettleAuction"
      );
    });
  });

  describe("Restart Auction", function() {
    it("It check if the auction deadline is passed", async function() {
      const { auctionHouse, bidder } = await loadFixture(fixutureWithAuction);
      await expect(
        auctionHouse.connect(bidder).restartAuction(1)
      ).to.be.revertedWith("not-finished");
    });

    it("It check if the auction has no bid on it", async function() {
      const { auctionHouse, bidder } = await loadFixture(fixutureWithAuction);
      await auctionHouse.connect(bidder).increaseBidSize(...aota(bid1));
      const sevenDays = 7 * 24 * 60 * 60;
      await ethers.provider.send("evm_increaseTime", [sevenDays]);
      await ethers.provider.send("evm_mine");
      await expect(
        auctionHouse.connect(bidder).restartAuction(1)
      ).to.be.revertedWith("bid-already-placed");
    });

    it("Must change auction deadline", async function() {
      const { auctionHouse, bidder } = await loadFixture(fixutureWithAuction);
      const beforeDeadline = (await auctionHouse.bids(1)).auctionDeadline;
      const sevenDays = 7 * 24 * 60 * 60;
      await ethers.provider.send("evm_increaseTime", [sevenDays]);
      await ethers.provider.send("evm_mine");
      await auctionHouse.connect(bidder).restartAuction(1);

      const afterDeadline = (await auctionHouse.bids(1)).auctionDeadline;

      expect(afterDeadline).to.be.greaterThan(beforeDeadline);
    });

    it("it check emittion of RestartAuction", async function() {
      const { auctionHouse, bidder } = await loadFixture(fixutureWithAuction);
      const sevenDays = 7 * 24 * 60 * 60;
      await ethers.provider.send("evm_increaseTime", [sevenDays]);
      await ethers.provider.send("evm_mine");

      await expect(
        await auctionHouse.connect(bidder).restartAuction(1)
      ).to.emit(auctionHouse, "RestartAuction");
    });
  });

  describe("Withdraw bidding token", function() {
    it("It check if user bid token balance gets zero", async function() {
      const { auctionHouse, bidder } = await loadFixture(fixutureForWithdraw);
      await auctionHouse.connect(bidder).withdrawBididngToken();
      const afterBalance = await auctionHouse.bidTokenBalances(bidder.address);
      expect(afterBalance).to.equal(0);
    });

    it("It check if user got his bid tokens back", async function() {
      const { auctionHouse, bidder, flx } = await loadFixture(
        fixutureForWithdraw
      );
      const beforeBalance = await auctionHouse.bidTokenBalances(bidder.address);
      const flxBeforeBalance = await flx.balanceOf(bidder.address);
      await auctionHouse.connect(bidder).withdrawBididngToken();
      const flxAfterBalance = await flx.balanceOf(bidder.address);
      expect(flxAfterBalance.sub(flxBeforeBalance)).to.equal(beforeBalance);
    });
    //
    it("It check emittion of BiddingTokenWithdraw", async function() {
      const { auctionHouse, bidder } = await loadFixture(fixutureForWithdraw);

      await expect(
        await auctionHouse.connect(bidder).withdrawBididngToken()
      ).to.emit(auctionHouse, "BiddingTokenWithdraw");
    });
  });
});
