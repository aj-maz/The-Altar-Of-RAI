/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import DataPanel from "./DataPanel";
import moment from "moment";
import { ethers } from "ethers";

const RemainingKite = ({ streamData }) => {
  const duration = streamData.stopTime.sub(streamData.startTime);

  const startDate = new Date(parseInt(String(streamData.startTime)) * 1000);

  const pastTime = moment().diff(startDate, "seconds");

  const progress = Number(
    String(
      ethers.BigNumber.from(pastTime)
        .mul(ethers.BigNumber.from(100))
        .div(duration)
    )
  );

  const remaining = (
    Number(ethers.utils.formatEther(streamData.streamBalanceOfTreasury)) /
    (1 * 10 ** 6)
  ).toFixed(1);

  return (
    <DataPanel progress={progress}>Remaining {remaining}m $KITE</DataPanel>
  );
};

export default RemainingKite;
