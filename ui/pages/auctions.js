/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Container, Grid } from "@mui/material";
import { ethers } from "ethers";

import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";

import AuctionInfo from "../components/AuctionInfo.js";
import Bidder from "../components/Bidder.js";
import BidHistory from "../components/BidHistory.js";
import RestartAuction from "../components/RestartAuction.js";
import SettleAuction from "../components/SettleAuction.js";
import Withdraw from "../components/Withdraw.js";
import AuctionsList from "../components/AuctionsList.js";
import useTransactions from "../components/useTransactions.js";
import addresses from "../components/lib/addresses.js";
import TxSnakbar from "../components/TxSnakbar.js";

const AUCTIONS = gql`
  {
    auctions(first: 100) {
      id
      amountToSell
      highBidder {
        id
      }
      bidExpiry
      settled
      bidExpiry
      createdAt
      bidsCount
      highestBid
      createdAt
      auctionDeadline
      bids {
        id
        bidder {
          id
          balance
        }
        date
        bidAmount
      }
    }
  }
`;

const AuctionsPage = () => {
  const auctionsQuery = useQuery(AUCTIONS);
  const [anotherRefetchCounter, setARC] = useState(0);

  const [selectedAuction, setSelectedAuction] = useState(null);

  const {
    bid,
    recipient,
    neededApproval,
    increaseAllowance,
    txType,
    refetchCounter,
  } = useTransactions({ addresses });

  useEffect(() => {
    setInterval(() => {
      setARC((r) => r + 1);
    }, 5000);
  }, []);

  useEffect(() => {
    auctionsQuery.refetch();
  }, [refetchCounter, anotherRefetchCounter]);

  useEffect(() => {
    if (auctionsQuery.data && auctionsQuery.data.auctions.length) {
      if (!selectedAuction) {
        setSelectedAuction(auctionsQuery.data.auctions[0]);
      }
    }
  }, [auctionsQuery.data]);

  const context = {
    bidIncrease: ethers.utils.parseEther("0.5"),
  };
  const userFlxBalance = ethers.utils.parseEther("15.5");

  const actions = {
    bid: () => {},
  };

  const loading = auctionsQuery.loading;

  if (loading) {
    return <div>Loading ...</div>;
  }

  const renderAuction = (auction) => {
    if (!auction) return null;

    return (
      <>
        <TxSnakbar recipient={recipient} txType={txType} />
        <Grid item md={8}>
          <AuctionInfo auction={auction} context={context} />
          <div
            css={css`
              margin-bottom: 1em;
            `}
          ></div>
          <BidHistory bidsHistory={auction.bids} context={context} />
        </Grid>
        <Grid item md={4}>
          <Bidder
            bid={bid}
            context={context}
            recipient={recipient}
            auction={auction}
            neededApproval={neededApproval}
            increaseAllowance={increaseAllowance}
          />
          <div
            css={css`
              margin-bottom: 1em;
            `}
          ></div>
          <RestartAuction context={context} />
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
      </>
    );
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
        {renderAuction(selectedAuction)}
        <Grid item md={12}>
          <AuctionsList
            setSelectedAuction={setSelectedAuction}
            auctions={auctionsQuery.data.auctions}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuctionsPage;
