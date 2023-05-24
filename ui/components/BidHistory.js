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
import { dateFormat, formatAddress } from "./lib/utils";
import AddressLink from "./AddressLink";
import moment from "moment";
import { ethers } from "ethers";

const BidHistory = ({ bidsHistory }) => {
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
          {bidsHistory.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.id}
              </TableCell>
              <TableCell>{ethers.utils.formatEther(item.currentBid)}</TableCell>
              <TableCell>{moment(item.date).format(dateFormat)}</TableCell>
              <TableCell>
                <AddressLink address={item.bidder} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default BidHistory;
