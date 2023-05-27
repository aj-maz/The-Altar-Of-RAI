/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";

import { formatAddress, explorer } from "./lib/utils";

function AddressDialog({ addresses, open, handleClose }) {
  const AddressRow = ({ address, title }) => {
    return (
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Typography
          variant="h6"
          css={css`
            margin-right: 1em;
          `}
        >
          {title}:
        </Typography>
        <Typography
          variant="body"
          css={(theme) =>
            css`
              color: ${theme.palette.secondary.main};
            `
          }
        >
          <a
            css={css``}
            target="_blank"
            href={`${explorer}/address/${address}`}
          >
            {formatAddress(address, 16)}
          </a>
        </Typography>
      </div>
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Systems Contracts Addresses"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <AddressRow address={addresses.sablier} title="Sablier" />
            <AddressRow address={addresses.flx} title="Flx" />
            <AddressRow address={addresses.kite} title="Kite" />
            <AddressRow address={addresses.treasury} title="Treasury" />
            <AddressRow address={addresses.altar} title="Altar" />
            <AddressRow
              address={addresses.auctionHouse}
              title="Auction House"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddressDialog;
