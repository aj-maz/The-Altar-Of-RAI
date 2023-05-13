// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const addresses = {
  sablier: "0xFc7E3a3073F88B0f249151192812209117C2014b",
  flx: "0x9e32c0EfF886B6Ccae99350Fd5e7002dCED55F15",
  lit: "0x91056d4a53e1faa1a84306d4deaec71085394bc8",
  settlement: "0x9008D19f58AAbD9eD0D60971565AA8510560ab41",
  treasury: "0xa5f2a0BB8AA738980e30Ec4a37415263fC470fa7",
  altar: "0x4c94c01b2bA07bb90B39e9c39891c0456eA24c05",
};

const AMOUNT = 90000;
const STREAM_PERIODE = 9000;
const POKE_COOLDOWN = 900;

/// Treasury Address -> 0x47535486A9C1C12B0f61Ea56C2EbB2BE5f7156AA
/// Altar Address -> 0x67368e5495beF0aC25F37E9ef053Ad7333097Da0

const deployTreasury = async () => {
  const Treasury = await hre.ethers.getContractFactory("AltarTreasury");
  const treasury = await Treasury.deploy(addresses.sablier, addresses.lit);
  console.log(`Altar treasury address: ${treasury.address}`);
  return treasury;
};

const deployAltar = async ({ treasuryAddress }) => {
  const Altar = await hre.ethers.getContractFactory("Altar");
  const altar = await Altar.deploy(
    addresses.sablier,
    addresses.lit,
    addresses.flx,
    treasuryAddress,
    POKE_COOLDOWN,
    addresses.settlement,
    {
      gasLimit: 10000000,
    }
  );

  await altar.deployed();

  console.log(`Altar  address: ${altar.address}`);
};

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
  await deployTreasury();
  // Then send tokens to the treasury
  // then deployAltar
  //await deployAltar({
  //  treasuryAddress: "0xa5f2a0BB8AA738980e30Ec4a37415263fC470fa7",
  //});
  // then startStream
  await startStream({
    treasuryAddress: "0xa5f2a0BB8AA738980e30Ec4a37415263fC470fa7",
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
