export const dateFormat = "YYYY/MM/DD";

export const explorer = "https://polygonscan.com/";

export const formatAddress = (address, len = 6) =>
  `${address.substring(0, len)}...${address.substring(
    address.length - len,
    address.length
  )}`;
