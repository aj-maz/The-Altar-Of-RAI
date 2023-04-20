const hre = require("hardhat");

const targetMint = "0x4A87a2A017Be7feA0F37f03F3379d43665486Ff8";

async function main() {
  const ethers = hre.ethers;
  //const LIT = await hre.ethers.getContractFactory("LIT");
  //const lit = LIT.attach("0xeB6c682988C109346DEb1ba877f3FA34Cc1c1883");
  //
  ////await lit.deployed();
  //
  //console.log(`LIT has deployed with address: ${lit.address}`);
  //
  const FLX = await hre.ethers.getContractFactory("FLX");
  const flx = FLX.attach("0xcDf649bd76C199FC99bEbBc48aE16426b9f67DdF");

  //await flx.deployed();
  //
  //console.log(`FLX has deployed with address: ${flx.address}`);
  const targetAmount = ethers.utils.parseEther("1000000000000");
  //await lit.mint(targetMint, targetAmount);
  //console.log("lit minted for: ", targetMint);
  await flx.mint(targetMint, targetAmount);
  console.log("flx minted for: ", targetMint);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
