const hre = require("hardhat");
const allAddresses = require("../addresses.json");

async function main() {
  const networkName = hre.network.name;
  const addresses = allAddresses[networkName];
  const streamPeriode = process.env.STREAM_PERIODE;

  if (!addresses) {
    throw new Error(
      `Addresses for ${networkName} network are not defined! Please config addresses.json.`
    );
  }

  const Treasury = await hre.ethers.getContractFactory("AltarTreasury");
  const treasuryAddress = process.env.TREASURY_ADDRESS;
  const altarAddress = process.env.ALTAR_ADDRESS;
  const treasury = Treasury.attach(treasuryAddress);
  try {
    await treasury.startStream(streamPeriode, altarAddress);
    console.log("treasury started");
  } catch (err) {
    console.log(err);
  }
  const Altar = await hre.ethers.getContractFactory("Altar");
  const altar = Altar.attach(altarAddress);
  try {
    console.log(await altar.streamId());
  } catch (err) {
    console.log(err);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
