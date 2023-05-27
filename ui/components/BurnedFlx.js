/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DataPanel from "./DataPanel";
import { ethers } from "ethers";

const BurnedFlx = ({ flxBalance }) => {
  const balance = (
    Number(ethers.utils.formatEther(flxBalance)) /
    (1 * 10 ** 3)
  ).toFixed(1);

  return <DataPanel>Burned {balance}k $FLX</DataPanel>;
};
export default BurnedFlx;
