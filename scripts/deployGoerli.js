// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

//const addresses = {
//  sablier: "0xFc7E3a3073F88B0f249151192812209117C2014b",
//  flx: "0xcDf649bd76C199FC99bEbBc48aE16426b9f67DdF",
//  lit: "0xeB6c682988C109346DEb1ba877f3FA34Cc1c1883",
//  treasury: "0xb1984847CB503418915E293f2B8f01B1aB289B81",
//  altar: "0xe2Cb07da23Cff8Beb6665192f9D417Ba65c777Ab",
//  auctionHouse: "0x9D19cC66560bc02BE56Bd2FCaa7A5A97323e450A",
//};

const addresses = {
  sablier: "0xFc7E3a3073F88B0f249151192812209117C2014b",
  flx: "0xcDf649bd76C199FC99bEbBc48aE16426b9f67DdF",
  lit: "0xeB6c682988C109346DEb1ba877f3FA34Cc1c1883",
  treasury: "0x9Fe0439781Dc7278450f4a8745E1F4E7F18c6a7A",
  altar: "0xFd08bc7e57f8Ba7F2FF34d84dc7187604A098231",
  auctionHouse: "0xFbF24c5716764E0be2609356AFC1Bfed0e03eE4C",
};

const AMOUNT = 900000000;
const STREAM_PERIODE = 9000;
const POKE_COOLDOWN = 180;

/// Treasury Address -> 0x47535486A9C1C12B0f61Ea56C2EbB2BE5f7156AA
/// Altar Address -> 0x67368e5495beF0aC25F37E9ef053Ad7333097Da0

const deployTreasury = async () => {
  const Treasury = await hre.ethers.getContractFactory("AltarTreasury");
  const treasury = await Treasury.deploy(addresses.sablier, addresses.lit);
  console.log(treasury);
  console.log(`Altar treasury address: ${treasury.address}`);
  return treasury;
};

const deployAuctionHouse = async () => {
  const AuctionHouse = await hre.ethers.getContractFactory("AuctionHouse");
  const auctionHouse = await AuctionHouse.deploy(addresses.flx, addresses.lit);
  console.log(`Auction house address: ${auctionHouse.address}`);
  return auctionHouse;
};

const deployAltar = async ({ treasuryAddress }) => {
  const Altar = await hre.ethers.getContractFactory("Altar");
  const altar = await Altar.deploy(
    addresses.sablier,
    addresses.lit,
    addresses.flx,
    treasuryAddress,
    POKE_COOLDOWN,
    addresses.auctionHouse,
    {
      gasLimit: 10000000,
    }
  );

  await altar.deployed();

  console.log(`Altar  address: ${altar.address}`);
};

const initializeAuctionHouse = async () => {
  const AuctionHouse = await hre.ethers.getContractFactory("AuctionHouse");
  const auctionHouse = AuctionHouse.attach(addresses.auctionHouse);

  await auctionHouse.initialize(addresses.altar);
};
//
const startStream = async ({ treasuryAddress }) => {
  const Treasury = await hre.ethers.getContractFactory("AltarTreasury");
  const treasury = Treasury.attach(treasuryAddress);

  try {
    await treasury.startStream(STREAM_PERIODE, addresses.altar);
    console.log("treasury started");
  } catch (err) {
    console.log(err);
  }
};

async function main() {
  //First deployTreasury
  //await deployTreasury();
  //await deployAuctionHouse();
  // Then send tokens to the treasury
  // then deployAltar
  //await deployAltar({
  //  treasuryAddress: addresses.treasury,
  //});
  //await initializeAuctionHouse();
  // then startStream
  await startStream({
    treasuryAddress: addresses.treasury,
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
