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

const BidHistory = ({ auctions, setSelectedAuction }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Bid Amount</TableCell>
            <TableCell>Highest Bid</TableCell>
            <TableCell>CreatedAt</TableCell>
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
              onClick={() => setSelectedAuction(item)}
            >
              <TableCell component="th" scope="row">
                {ethers.BigNumber.from(item.id).toString()}
              </TableCell>
              <TableCell>
                {ethers.utils.formatEther(item.amountToSell)} $KITE
              </TableCell>
              <TableCell>
                {ethers.utils.formatEther(item.highestBid)} $FLX
              </TableCell>
              <TableCell>
                {moment(Number(String(item.auctionDeadline)) * 1000).format(
                  dateFormat
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default BidHistory;
