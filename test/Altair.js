const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Altar", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function fixuture() {
    const Sablier = await ethers.getContractFactory("Sablier");
    const sablier = await Sablier.deploy();

    const LIT = await ethers.getContractFactory("LIT");
    const lit = await LIT.deploy();

    const FLX = await ethers.getContractFactory("FLX");
    const flx = await FLX.deploy();

    const Altar = await ethers.getContractFactory("Altar");
    const altar = await Altar.deploy(sablier.address, lit.address, flx.address);

    return { sablier, lit, flx, altar };
  }

  describe("Deployment", function () {
    it("Sablier should exist", async function () {
      const { sablier } = await loadFixture(fixuture);
      expect(sablier.address).to.exist;
    });

    it("LIT should exist", async function () {
      const { lit } = await loadFixture(fixuture);
      expect(lit.address).to.exist;
    });

    it("FLX should exist", async function () {
      const { flx } = await loadFixture(fixuture);
      expect(flx.address).to.exist;
    });

    it("Altar must have proper addresses setted", async function () {
      const { altar, sablier, flx, lit } = await loadFixture(fixuture);
      expect(altar.address).to.exist;

      expect(await altar.lit()).to.equal(lit.address);
      expect(await altar.sablier()).to.equal(sablier.address);
      expect(await altar.flx()).to.equal(flx.address);
    });
  });
});
