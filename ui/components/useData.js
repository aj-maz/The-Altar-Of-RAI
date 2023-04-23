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
  const [altarLitBalance, setAltarLitBalance] = useState(null);
  const [altarFlxBalance, setAltarFlxBalance] = useState(null);
  const [nextPokeTime, setNextPokeTime] = useState(null);

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

    const lit = new ethers.Contract(addresses.lit, IERC20.abi, provider);
    const flx = new ethers.Contract(addresses.flx, IERC20.abi, provider);

    const streamId = await altarTreasury.streamId();
    setStreamId(streamId);

    try {
      const streamData = await sablier.getStream(streamId);
      setStreamData(streamData);
    } catch (err) {}

    const altarLitBalance = await lit.balanceOf(addresses.altar);
    const altarFlxBalance = await flx.balanceOf(addresses.altar);

    setAltarLitBalance(altarLitBalance);
    setAltarFlxBalance(altarFlxBalance);

    const nextPokeTime = new Date(
      parseInt(String(await altar.nextPokeTime())) * 1000
    );
    setNextPokeTime(nextPokeTime);

    setLoading(false);
  };

  useEffect(() => {
    main();
  }, []);

  return {
    loading,
    data: {
      altarFlxBalance,
      altarLitBalance,
      streamId,
      streamData,
      nextPokeTime,
    },
  };
};

export default useData;
