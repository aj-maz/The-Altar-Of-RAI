/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Container, Grid } from "@mui/material";
import { ethers } from "ethers";

import AuctionInfo from "../components/AuctionInfo.js";
import Bidder from "../components/Bidder.js";
import BidHistory from "../components/BidHistory.js";
import RestartAuction from "../components/RestartAuction.js";
import SettleAuction from "../components/SettleAuction.js";
import Withdraw from "../components/Withdraw.js";
import AuctionsList from "../components/AuctionsList.js";

const AuctionsPage = () => {
  const auctionInfo = {
    amountToSell: ethers.utils.parseEther("3"),
    highestBidder: "0x4A87a2A017Be7feA0F37f03F3379d43665486Ff8",
    currentBid: ethers.utils.parseEther("1.5"),
    deadline: new Date(1684896028560 + 24 * 7 * 3600 * 1000),
  };

  const context = {
    bidIncrease: ethers.utils.parseEther("5"),
  };

  const bidsHistory = [
    {
      id: 1,
      bidder: "0x4A87a2A017Be7feA0F37f03F3379d43665486Ff8",
      currentBid: ethers.utils.parseEther("1.5"),
      date: new Date(1684896028560 + 24 * 8 * 3600 * 1000),
    },
    {
      id: 2,
      bidder: "0x4A87a2A017Be7feA0F37f03F3379d43665486Ff8",
      currentBid: ethers.utils.parseEther("2.5"),
      date: new Date(1684896028560 + 24 * 9 * 3600 * 1000),
    },
    {
      id: 3,
      bidder: "0x4A87a2A017Be7feA0F37f03F3379d43665486Ff8",
      currentBid: ethers.utils.parseEther("11.5"),
      date: new Date(1684896028560 + 24 * 10 * 3600 * 1000),
    },
    {
      id: 4,
      bidder: "0x4A87a2A017Be7feA0F37f03F3379d43665486Ff8",
      currentBid: ethers.utils.parseEther("15.5"),
      date: new Date(1684896028560 + 24 * 11 * 3600 * 1000),
    },
  ];

  const auctions = [
    {
      id: 1,
      sellAmount: ethers.utils.parseEther("4"),
      currentBid: ethers.utils.parseEther("1.5"),
      deadline: new Date(1684896028560 + 24 * 8 * 3600 * 1000),
    },
    {
      id: 2,
      sellAmount: ethers.utils.parseEther("6"),
      currentBid: ethers.utils.parseEther("2.5"),
      deadline: new Date(1684896028560 + 24 * 8 * 3600 * 1000),
    },
    {
      id: 3,
      sellAmount: ethers.utils.parseEther("5"),
      currentBid: ethers.utils.parseEther("6.5"),
      deadline: new Date(1684896028560 + 24 * 8 * 3600 * 1000),
    },
    {
      id: 4,
      sellAmount: ethers.utils.parseEther("7"),
      currentBid: ethers.utils.parseEther("2.5"),
      deadline: new Date(1684896028560 + 24 * 8 * 3600 * 1000),
    },
  ];

  const userFlxBalance = ethers.utils.parseEther("15.5");

  const actions = {
    bid: () => {},
  };

  return (
    <Container>
      <Grid
        container
        css={css`
          margin-top: 1em;
        `}
        spacing={2}
      >
        <Grid item md={8}>
          <AuctionInfo info={auctionInfo} context={context} />
          <div
            css={css`
              margin-bottom: 1em;
            `}
          ></div>
          <BidHistory bidsHistory={bidsHistory} context={context} />
        </Grid>
        <Grid item md={4}>
          <Bidder info={auctionInfo} context={context} actions={actions} />
          <div
            css={css`
              margin-bottom: 1em;
            `}
          ></div>
          <RestartAuction info={auctionInfo} context={context} />
          <div
            css={css`
              margin-bottom: 1em;
            `}
          ></div>
          <SettleAuction />
          <div
            css={css`
              margin-bottom: 1em;
            `}
          ></div>
          <Withdraw userFlxBalance={userFlxBalance} />
        </Grid>
        <Grid item md={12}>
          <AuctionsList auctions={auctions} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuctionsPage;
