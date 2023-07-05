const deployers = (hre, addresses) => {
  const deployTreasury = async () => {
    const Treasury = await hre.ethers.getContractFactory("AltarTreasury");
    const treasury = await Treasury.deploy(addresses.sablier, addresses.lit);
    console.log(`Altar treasury address: ${treasury.address}`);
    return treasury;
  };

  const deployAltar = async ({
    pokeCooldown,
    auctionTime,
    treasuryAddress,
  }) => {
    const Altar = await hre.ethers.getContractFactory("Altar");
    const altar = await Altar.deploy(
      addresses.sablier,
      addresses.lit,
      addresses.flx,
      treasuryAddress ? treasuryAddress : addresses.treasury,
      pokeCooldown,
      auctionTime,
      addresses.auctionHouse
    );
    await altar.deployed();
    console.log(`Altar address: ${altar.address}`);
  };

  const deployAltarAndTreasury = async ({ pokeCooldown, auctionTime }) => {
    const treasury = await deployTreasury();
    await deployAltar({
      pokeCooldown,
      auctionTime,
      treasuryAddress: treasury.address,
    });
  };

  return {
    deployTreasury,
    deployAltar,
    deployAltarAndTreasury,
  };
};

module.exports = deployers;
