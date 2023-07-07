const hre = require("hardhat");

const targetMint = "0x4A87a2A017Be7feA0F37f03F3379d43665486Ff8";

async function main() {
  const ethers = hre.ethers;
  const KITE = await hre.ethers.getContractFactory("KITE");
  //const kite = await KITE.deploy();
  const kite = KITE.attach("0x0494f45fcABF5edAb17ED75345c0c70Ed442125C");
  //
  //await kite.deployed();
  //
  //console.log(`KITE has deployed with address: ${kite.address}`);
  //
  //const FLX = await hre.ethers.getContractFactory("FLX");
  //const flx = await FLX.deploy();
  //
  //await flx.deployed();
  ////
  //console.log(`FLX has deployed with address: ${flx.address}`);
  //
  ////console.log(`FLX has deployed with address: ${flx.address}`);
  const targetAmount = ethers.utils.parseEther("1000000000000");
  await kite.mint(targetMint, targetAmount);
  console.log("kite minted for: ", targetMint);
  //await flx.mint(targetMint, targetAmount);
  //console.log("flx minted for: ", targetMint);

  //const Sablier = await hre.ethers.getContractFactory("Sablier");
  //const sablier = await Sablier.deploy();
  //
  //await sablier.deployed();
  //console.log(`Sablier has deployed with address: ${sablier.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
