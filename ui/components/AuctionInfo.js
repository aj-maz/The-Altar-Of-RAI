/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, Typography, Paper, Divider } from "@mui/material";
import moment from "moment";
import { ethers } from "ethers";
import { dateFormat } from "./lib/utils";
import AddressLink from "./AddressLink";

const AuctionInfo = ({ auction }) => {
  return (
    <Paper>
      <Typography
        css={css`
          padding: 0.5em 1em;
        `}
        variant="h6"
      >
        Auction Info
      </Typography>
      <Divider />
      <div
        css={css`
          padding: 0.5em 1em 1em;
        `}
      >
        <Grid container spacing={2}>
          <Grid md={6} item>
            <Typography variant="body1">
              Auction Offer:{" "}
              <span
                css={(theme) => css`
                  color: ${theme.palette.secondary.main};
                `}
              >
                {ethers.utils.formatEther(auction.amountToSell)} $LITE
              </span>
            </Typography>
          </Grid>
          <Grid md={6} item>
            <Typography variant="body1">
              Highest Bidder:{" "}
              {auction.highBidder ? (
                <AddressLink address={auction.highBidder.id} />
              ) : (
                "None"
              )}
            </Typography>
          </Grid>
          <Grid md={6} item>
            <Typography variant="body1">
              Current Bid:{" "}
              <span
                css={(theme) => css`
                  color: ${theme.palette.secondary.main};
                `}
              >
                {ethers.utils.formatEther(auction.highestBid)} $FLX
              </span>
            </Typography>
          </Grid>
          <Grid md={6} item>
            <Typography variant="body1">
              Ends At:{" "}
              <span
                css={(theme) => css`
                  color: ${theme.palette.secondary.main};
                `}
              >
                {Number(auction.auctionDeadline.toString()) * 1000 > new Date()
                  ? moment(
                      Number(auction.auctionDeadline.toString()) * 1000
                    ).format(dateFormat)
                  : "Already Ended!"}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};

export default AuctionInfo;
