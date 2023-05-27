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
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

const Bidder = ({
  auction,
  context,
  bid,
  recipient,
  neededApproval,
  increaseAllowance,
}) => {
  // TODO: Bidding action must be added

  const currentBid = ethers.BigNumber.from(auction.highestBid);

  const [bidAmount, setBidAmount] = useState(
    ethers.utils.formatEther(currentBid.add(context.bidIncrease))
  );
  const [error, setError] = useState("");

  const [neededApprovals, setNeededApproval] = useState(null);
  const [loadingApproval, setLoadingApproval] = useState(false);

  useEffect(() => {
    setBidAmount(ethers.utils.formatEther(currentBid.add(context.bidIncrease)));
  }, [currentBid]);

  useEffect(() => {
    const main = async () => {
      if (bidAmount) {
        setLoadingApproval(true);
        const nedAp = await neededApproval(ethers.utils.parseEther(bidAmount));
        setNeededApproval(nedAp);
        setLoadingApproval(false);
      }
    };

    main();
  }, [bidAmount, recipient]);

  useEffect(() => {
    if (!bidAmount) {
      setError("Bid amount is required!");
    } else if (isNaN(bidAmount)) {
      setError("Bid must be a number!");
    } else if (
      ethers.utils.parseEther(bidAmount).lt(currentBid.add(context.bidIncrease))
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
              error={!!error}
              helperText={error}
              color="secondary"
              size="small"
            />
          </Grid>
          <Grid md={3} item>
            {loadingApproval || neededApprovals?.gt(0) ? (
              <Button
                fullWidth
                disabled={!!error || !!recipient || loadingApproval}
                variant="contained"
                color="secondary"
                onClick={() => {
                  increaseAllowance(neededApprovals);
                }}
              >
                {neededApprovals ? `Approve` : <CircularProgress size={25} />}
              </Button>
            ) : (
              <Button
                fullWidth
                disabled={!!error || !!recipient}
                variant="contained"
                color="secondary"
                onClick={() => {
                  bid(auction.id, ethers.utils.parseEther(bidAmount));
                }}
              >
                Bid
              </Button>
            )}
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};
export default Bidder;
