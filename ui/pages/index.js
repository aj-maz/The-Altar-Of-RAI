import { useEffect } from "react";
import AltarTreasury from "../../artifacts/contracts/AltarTreasury.sol/AltarTreasury.json";
import Altar from "../../artifacts/contracts/Altar.sol/Altar.json";
import ISablier from "../../artifacts/contracts/interfaces/ISablier.sol/ISablier.json";
import IERC20 from "../../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";

import useData from "../components/useData";

import PokeButton from "../components/PokeButton";
import DataShower from "../components/DataShower";

const addresses = {
  sablier: "0xFc7E3a3073F88B0f249151192812209117C2014b",
  lit: "0x9e32c0EfF886B6Ccae99350Fd5e7002dCED55F15",
  flx: "0x91056d4a53e1faa1a84306d4deaec71085394bc8",
  settlement: "0x9008D19f58AAbD9eD0D60971565AA8510560ab41",
  treasury: "0x07621e58b00290985bd31238e2C2f335890cb4Db",
  altar: "0x22ba37dE2E05b797dB1Fc9EdD2324E88Af81fbF0",
};

export default function Home() {
  const { loading, data } = useData(addresses);

  /// TODO: Now we need a button to first connect
  /// TODO: After connection we need to be able to poke
  return (
    <div className="container">
      <div className="data-holder">
        {loading ? (
          "Loading Data ..."
        ) : (
          <div>
            <DataShower data={data} addresses={addresses} />{" "}
            <PokeButton data={data} addresses={addresses} />
          </div>
        )}
      </div>
    </div>
  );
}
