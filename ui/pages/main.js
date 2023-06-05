/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Container, Grid, Button, IconButton, Badge } from "@mui/material";
import { LocalOffer, Info } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

import DataPanel from "../components/DataPanel";
import useData from "../components/useData";
import NextEventIn from "../components/NextEventIn";
import RemainingKite from "../components/RemainingKite";
import BurnedFlx from "../components/BurnedFlx";
import AddressDialog from "../components/AddressDIalog";

import useTransactions from "../components/useTransactions";
import addresses from "../components/lib/addresses";
import Loading from "../components/Loading";
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
    }
  }
`;

const Main = () => {
  const router = useRouter();

  const { defaultAccount, connect, poke, txType, refetchCounter, recipient } =
    useTransactions({ addresses });
  const auctionsQuery = useQuery(AUCTIONS);

  const [isPoking, setIsPoking] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);

  const data = useData(addresses);

  useEffect(() => {
    auctionsQuery.refetch();
    data.data.refetch();
  }, [recipient]);

  if (data.loading) {
    return <Loading />;
  }

  return (
    <Container>
      <TxSnakbar recipient={recipient} txType={txType} />

      <Grid
        container
        css={css`
          margin-top: 1em;
        `}
      >
        <Grid item md={4}>
          <div
            css={css`
              display: flex;
            `}
          >
            <div
              css={css`
                margin-right: 0.5em;
              `}
            >
              <DataPanel>Altar Of Rai</DataPanel>
            </div>
            <div
              css={css`
                margin-right: 0.5em;
              `}
            >
              <NextEventIn
                nextPokeTime={data.data.nextPokeTime}
                pokeCooldown={data.data.pokeCooldown}
              />
            </div>
          </div>
        </Grid>

        <Grid item md={5}>
          <div
            css={css`
              display: flex;
            `}
          >
            <div
              css={css`
                margin-right: 0.5em;
              `}
            >
              <RemainingKite streamData={data.data.streamData} />
            </div>
            <div
              css={css`
                margin-right: 0.5em;
              `}
            >
              <BurnedFlx flxBalance={data.data.altarFlxBalance} />
            </div>
          </div>
        </Grid>
        <Grid item md={3}>
          <div
            css={css`
              display: flex;
              flex-direction: row-reverse;
              margin-top: 0.25em;
            `}
          >
            {!defaultAccount ? (
              <Button
                onClick={connect}
                size="small"
                variant="contained"
                color="secondary"
              >
                Connect To Poke
              </Button>
            ) : (
              <Button
                onClick={async () => {
                  setIsPoking(true);
                  try {
                    await poke();
                  } catch (err) {
                    console.log(err);
                  }
                  setIsPoking(false);
                }}
                size="small"
                disabled={isPoking || recipient}
                variant="contained"
                color="secondary"
              >
                Poke
              </Button>
            )}

            <IconButton
              css={css`
                margin-right: 0.5em;
              `}
              size="small"
              onClick={() => setAddressOpen(true)}
            >
              <Info />
            </IconButton>
            <IconButton
              css={css`
                margin-right: 0.5em;
              `}
              size="small"
            >
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={
                  auctionsQuery.data
                    ? auctionsQuery.data.auctions.filter(
                        (auction) => !auction.settled
                      ).length
                    : null
                }
                onClick={() => router.push("/auctions")}
                color="secondary"
              >
                <LocalOffer />
              </Badge>
            </IconButton>
          </div>
        </Grid>
        <AddressDialog
          addresses={addresses}
          open={addressOpen}
          handleClose={() => setAddressOpen(false)}
        />
      </Grid>
    </Container>
  );
};
export default Main;
