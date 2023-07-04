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
//  auctionHouse: "0xFc7E3a3073F88B0f249151192812209117C2014b",
//};

/// old altar -

const goerliAddresses = {
  sablier: "0xFc7E3a3073F88B0f249151192812209117C2014b",
  flx: "0xcDf649bd76C199FC99bEbBc48aE16426b9f67DdF",
  lit: "0x0494f45fcABF5edAb17ED75345c0c70Ed442125C",
  treasury: "0xC68021FE976709B118ee0EdB710811d49CfAe30E",
  altar: "0x068aAE6D83f5b456c06D13530b90fbbA4bd75e98",
  auctionHouse: "0x1fBAb40C338E2e7243DA945820Ba680C92EF8281",
};

//const mumbaiAddresses = {
//  sablier: "0x7059A80bef72Eff58Fcd873733b54886DE621DDc",
//  flx: "0x2022B7A2A30B71cB8aFE3f7cc0Cd895942ab7a23",
//  lit: "0x9Fe0439781Dc7278450f4a8745E1F4E7F18c6a7A",
//  treasury: "0xbB07529aF8430A0E00b458b9b29a55Dc141177F0",
//  altar: "0x20D3d19667Eb4AfF64912D162C9d8A45cC3Fa023",
//  auctionHouse: "0x4100aF1E6e8bBc174fc5da4D409e1e3C03F1f85E",
//};

const addresses = goerliAddresses;

const AMOUNT = 9000000;
const STREAM_PERIODE = 180000;
const POKE_COOLDOWN = 3600;
const AUCTION_TIME = 2700;

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
    AUCTION_TIME,
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
  const Altar = await hre.ethers.getContractFactory("Altar");
  const altar = Altar.attach(addresses.altar);
  try {
    console.log(await altar.streamId());
  } catch (err) {
    console.log(err);
  }
};

const poke = async () => {
  //const Treasury = await hre.ethers.getContractFactory("AltarTreasury");
  //const treasury = Treasury.attach(treasuryAddress);
  //
  //try {
  //  await treasury.startStream(STREAM_PERIODE, addresses.altar);
  //  console.log("treasury started");
  //} catch (err) {
  //  console.log(err);
  //}
  const Altar = await hre.ethers.getContractFactory("Altar");
  const altar = Altar.attach(addresses.altar);
  try {
    console.log(await altar.poke());
  } catch (err) {
    console.log(err);
  }
};

async function main() {
  //First deployTreasury
  //await deployTreasury();
  //// Then send tokens to the treasury
  //// then deployAltar
  //await deployAltar({
  //  treasuryAddress: addresses.treasury,
  //});
  //await initializeAuctionHouse();
  // then startStream
  await startStream({
    treasuryAddress: addresses.treasury,
  });
  //await poke();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0x20D3d19667Eb4AfF64912D162C9d8A45cC3Fa023
