import { useEffect } from "react";
import AltarTreasury from "../../artifacts/contracts/AltarTreasury.sol/AltarTreasury.json";
import Altar from "../../artifacts/contracts/Altar.sol/Altar.json";
import ISablier from "../../artifacts/contracts/interfaces/ISablier.sol/ISablier.json";
import IERC20 from "../../artifacts/@openzeppelin/contracts/token/ERC20/IERC20.sol/IERC20.json";

import useData from "../components/useData";

import PokeButton from "../components/PokeButton";
import DataShower from "../components/DataShower";

const mumbaiAddresses = {
  sablier: "0x7059A80bef72Eff58Fcd873733b54886DE621DDc",
  flx: "0x2022B7A2A30B71cB8aFE3f7cc0Cd895942ab7a23",
  kite: "0x9Fe0439781Dc7278450f4a8745E1F4E7F18c6a7A",
  treasury: "0xbB07529aF8430A0E00b458b9b29a55Dc141177F0",
  altar: "0x20D3d19667Eb4AfF64912D162C9d8A45cC3Fa023",
  auctionHouse: "0x4100aF1E6e8bBc174fc5da4D409e1e3C03F1f85E",
};

const addresses = mumbaiAddresses;

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
