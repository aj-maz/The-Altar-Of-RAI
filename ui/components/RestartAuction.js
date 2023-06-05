/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, Typography, Paper, Divider, Button } from "@mui/material";

const RestartAuction = ({}) => {
  return (
    <Paper>
      <Typography
        css={css`
          padding: 0.5em 1em;
        `}
        variant="h6"
      >
        Restart
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
              This auction has ended without a bid. You can restart the auction.
            </Typography>
          </Grid>
          <Grid md={3} item>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="secondary"
              disabled
            >
              Restart
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};
export default RestartAuction;
