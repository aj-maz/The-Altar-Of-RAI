const hre = require("hardhat");
const deployers = require("./deployers");
const allAddresses = require("../addresses.json");

async function main() {
  const networkName = hre.network.name;
  const addresses = allAddresses[networkName];
  const treasuryAddress = process.env.TREASURY_ADDRESS;
  const pokeCooldown = process.env.POKE_COOLDOWN;
  const auctionTime = process.env.AUCTION_TIME;

  const { deployAltar } = deployers(hre, {
    ...addresses,
    treasury: treasuryAddress,
  });

  if (!addresses) {
    throw new Error(
      `Addresses for ${networkName} network are not defined! Please config addresses.json.`
    );
  }

  deployAltar({ auctionTime, pokeCooldown });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
