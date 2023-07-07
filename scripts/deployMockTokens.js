const hre = require("hardhat");

const deployMockTokens = async () => {
  const LIT = await hre.ethers.getContractFactory("LIT");
  const kite = await LIT.deploy();

  console.log(`LIT has deployed with address: ${kite.address}`);

  const FLX = await hre.ethers.getContractFactory("FLX");
  const flx = await FLX.deploy();

  console.log(`FLX has deployed with address: ${flx.address}`);

  return { kite, flx };
};

module.exports = deployMockTokens;
