/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, Typography, Paper, Divider, Button } from "@mui/material";

const SettleAuction = ({ auction, settle }) => {
  return (
    <Paper>
      <Typography
        css={css`
          padding: 0.5em 1em;
        `}
        variant="h6"
      >
        Settle
      </Typography>
      <Divider />
      <div
        css={css`
          padding: 1em 1em 1em;
        `}
      >
        <Grid container spacing={2}>
          <Grid md={9} item>
            <Typography variant="body2">
              This auction is finished and is waiting to be settled. Settle it
              now.
            </Typography>
          </Grid>
          <Grid md={3} item>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="secondary"
              onClick={() => {
                console.log("hi");
                settle(auction.id);
              }}
            >
              Settle
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};
export default SettleAuction;
