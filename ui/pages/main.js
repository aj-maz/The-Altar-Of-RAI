/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Container, Grid, Button, IconButton } from "@mui/material";
import { LocalOffer, Info } from "@mui/icons-material";

import DataPanel from "../components/DataPanel";

const Main = () => {
  return (
    <Container>
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
              <DataPanel progress={3}>Next event in 29 days</DataPanel>
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
              <DataPanel progress={32}>Remaining 1.2m $KITE</DataPanel>
            </div>
            <div
              css={css`
                margin-right: 0.5em;
              `}
            >
              <DataPanel progress={65}>Burned 300k $FLX</DataPanel>
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
            <Button size="small" variant="contained" color="secondary">
              Connect To Poke
            </Button>
            <IconButton
              css={css`
                margin-right: 0.5em;
              `}
              size="small"
            >
              <Info />
            </IconButton>
            <IconButton
              css={css`
                margin-right: 0.5em;
              `}
              size="small"
            >
              <LocalOffer />
            </IconButton>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Main;
