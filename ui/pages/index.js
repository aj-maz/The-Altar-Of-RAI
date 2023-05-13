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
  flx: "0x9e32c0EfF886B6Ccae99350Fd5e7002dCED55F15",
  lit: "0x91056d4a53e1faa1a84306d4deaec71085394bc8",
  settlement: "0x9008D19f58AAbD9eD0D60971565AA8510560ab41",
  treasury: "0xa5f2a0BB8AA738980e30Ec4a37415263fC470fa7",
  altar: "0x4c94c01b2bA07bb90B39e9c39891c0456eA24c05",
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
