/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { dateFormat } from "./lib/utils";
import moment from "moment";
import { ethers } from "ethers";

const BidHistory = ({ auctions }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Bid Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Bidder</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {auctions.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "&:hover": { background: "#222" },
              }}
              css={css`
                cursor: pointer;
              `}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell>
                {ethers.utils.formatEther(item.sellAmount)} $KITE
              </TableCell>
              <TableCell>
                {ethers.utils.formatEther(item.sellAmount)} $FLX
              </TableCell>
              <TableCell>{moment(item.deadline).format(dateFormat)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default BidHistory;
