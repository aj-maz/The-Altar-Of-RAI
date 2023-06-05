import { useState, useEffect } from "react";
import { ethers } from "ethers";
import AltarTreasury from "../../artifacts/contracts/AltarTreasury.sol/AltarTreasury.json";
import Altar from "../../artifacts/contracts/Altar.sol/Altar.json";
import ISablier from "../../artifacts/contracts/interfaces/ISablier.sol/ISablier.json";
import IERC20 from "../../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";

const useData = (addresses) => {
  const [loading, setLoading] = useState(true);
  const [streamId, setStreamId] = useState(null);
  const [streamData, setStreamData] = useState(null);
  const [altarKiteBalance, setAltarKiteBalance] = useState(null);
  const [altarFlxBalance, setAltarFlxBalance] = useState(null);
  const [nextPokeTime, setNextPokeTime] = useState(null);
  const [pokeCooldown, setPokeCooldown] = useState(null);

  const main = async () => {
    const GOERLI_RPC =
      "https://eth-goerli.g.alchemy.com/v2/l_THcPj6shiZ-E1LyKHnHeXx75E1iXrT";

    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC);

    const altarTreasury = new ethers.Contract(
      addresses.treasury,
      AltarTreasury.abi,
      provider
    );

    const sablier = new ethers.Contract(
      addresses.sablier,
      ISablier.abi,
      provider
    );

    const altar = new ethers.Contract(addresses.altar, Altar.abi, provider);

    const kite = new ethers.Contract(addresses.kite, IERC20.abi, provider);
    const flx = new ethers.Contract(addresses.flx, IERC20.abi, provider);

    const streamId = await altarTreasury.streamId();
    setStreamId(streamId);

    try {
      const streamData = await sablier.getStream(streamId);
      const streamBalanceOfAltar = await sablier.balanceOf(
        streamId,
        altar.address
      );
      const streamBalanceOfTreasury = await sablier.balanceOf(
        streamId,
        altarTreasury.address
      );
      setStreamData({
        ...streamData,
        streamBalanceOfAltar,
        streamBalanceOfTreasury,
      });
    } catch (err) {}

    const altarKiteBalance = await kite.balanceOf(addresses.altar);
    const altarFlxBalance = await flx.balanceOf(addresses.altar);

    setAltarKiteBalance(altarKiteBalance);
    setAltarFlxBalance(altarFlxBalance);

    const nextPokeTime = new Date(
      parseInt(String(await altar.nextPokeTime())) * 1000
    );
    setNextPokeTime(nextPokeTime);

    const pokeCooldown = await altar.pokeCooldown();
    setPokeCooldown(pokeCooldown);

    setLoading(false);
  };

  useEffect(() => {
    main();
  }, []);

  const refetch = () => main();

  return {
    loading,
    data: {
      altarFlxBalance,
      altarKiteBalance,
      streamId,
      streamData,
      nextPokeTime,
      pokeCooldown,
      refetch,
    },
  };
};

export default useData;
