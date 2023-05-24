/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Grid, Typography, Paper, Divider, Button } from "@mui/material";
import { ethers } from "ethers";

const Withdraw = ({ userFlxBalance }) => {
  return (
    <Paper>
      <Typography
        css={css`
          padding: 0.5em 1em;
        `}
        variant="h6"
      >
        Withdraw
      </Typography>
      <Divider />
      <div
        css={css`
          padding: 1em 1em 1em;
        `}
      >
        <Grid container spacing={2}>
          <Grid md={8} item>
            <Typography variant="body2">
              You can withdraw your remaining $FLX from auction house.
            </Typography>
            <Typography variant="body1">
              Balance:{" "}
              <span
                css={(theme) =>
                  css`
                    color: ${theme.palette.secondary.main};
                  `
                }
              >
                {ethers.utils.formatEther(userFlxBalance)} $FLX{" "}
              </span>
            </Typography>
          </Grid>
          <Grid md={4} item>
            <Button
              fullWidth
              size="small"
              variant="contained"
              color="secondary"
            >
              Withdraw
            </Button>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};
export default Withdraw;
