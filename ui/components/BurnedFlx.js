/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import DataPanel from "./DataPanel";
import { ethers } from "ethers";

const BurnedFlx = ({ flxBalance }) => {
  const balance = (Number(ethers.utils.formatEther(flxBalance)) / 1).toFixed(1);

  return <DataPanel>Burned {balance} $FLX</DataPanel>;
};
export default BurnedFlx;
