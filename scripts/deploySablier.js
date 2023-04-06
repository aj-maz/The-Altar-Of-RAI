const hre = require("hardhat");

const deploySablier = async () => {
  const Sablier = await hre.ethers.getContractFactory("Sablier");
  const sablier = await Sablier.deploy();

  console.log(`Sablier has deployed with address: ${sablier.address}`);

  return sablier;
};

module.exports = deploySablier;
