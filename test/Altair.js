const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Altair", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function fixuture() {
    ///const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    ///const ONE_GWEI = 1_000_000_000;
    ///
    ///const lockedAmount = ONE_GWEI;
    ///const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
    ///
    ///// Contracts are deployed using the first signer/account by default
    ///const [owner, otherAccount] = await ethers.getSigners();
    ///
    ///const Lock = await ethers.getContractFactory("Lock");
    ///const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
    ///
    ///return { lock, unlockTime, lockedAmount, owner, otherAccount };
    return {};
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      //const { lock, unlockTime } = await loadFixture(fixuture);
      //expect(await lock.unlockTime()).to.equal(unlockTime);
    });
  });
});
