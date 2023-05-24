/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { formatAddress, explorer } from "./lib/utils";

const AddressLink = ({ address }) => {
  return (
    <a
      css={(theme) => css`
        color: ${theme.palette.secondary.main};
      `}
      target="_blank"
      href={`${explorer}/address/${address}`}
    >
      {formatAddress(address)}
    </a>
  );
};
export default AddressLink;
