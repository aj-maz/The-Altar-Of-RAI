/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { CircularProgress, AlertTitle } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TxSnakbar({ recipient, txType }) {
  const open = recipient;

  return (
    <Snackbar open={open}>
      <Alert
        icon={<CircularProgress size={25} />}
        severity="warning"
        color="secondary"
        sx={{ width: "100%" }}
      >
        <AlertTitle>{txType}</AlertTitle>
        Tx Hash: {recipient?.hash}
      </Alert>
    </Snackbar>
  );
}

export default TxSnakbar;
