/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  Grid,
  Typography,
  TextField,
  Paper,
  Divider,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const Bidder = ({ info, context, actions }) => {
  // TODO: Bidding action must be added
  const [bidAmount, setBidAmount] = useState(
    ethers.utils.formatEther(info.currentBid.add(context.bidIncrease))
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bidAmount) {
      setError("Bid amount is required!");
    } else if (isNaN(bidAmount)) {
      setError("Bid must be a number!");
    } else if (
      ethers.utils
        .parseEther(bidAmount)
        .lt(info.currentBid.add(context.bidIncrease))
    ) {
      setError("Bid amount is too low!");
    } else {
      setError("");
    }
  }, [bidAmount]);

  return (
    <Paper>
      <Typography
        css={css`
          padding: 0.5em 1em;
        `}
        variant="h6"
      >
        Bid
      </Typography>
      <Divider />
      <div
        css={css`
          padding: 1em 1em 1em;
        `}
      >
        <Grid container spacing={2}>
          <Grid md={9} item>
            <TextField
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              label="Bid Amount"
              variant="outlined"
              fullWidth
              error={error}
              helperText={error}
              color="secondary"
              size="small"
            />
          </Grid>
          <Grid md={3} item>
            <Button
              fullWidth
              disabled={!!error}
              variant="contained"
              color="secondary"
            >
              Bid
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};
export default Bidder;
