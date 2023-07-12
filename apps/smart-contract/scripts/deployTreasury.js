const hre = require("hardhat");
const deployers = require("./deployers");
const allAddresses = require("../addresses.json");

async function main() {
  const networkName = hre.network.name;
  const addresses = allAddresses[networkName];
  const { deployTreasury } = deployers(hre, addresses);

  if (!addresses) {
    throw new Error(
      `Addresses for ${networkName} network are not defined! Please config addresses.json.`
    );
  }

  deployTreasury(addresses);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
