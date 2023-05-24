export const dateFormat = "YYYY/MM/DD";

export const explorer = "https://polygonscan.com/";

export const formatAddress = (address) =>
  `${address.substring(0, 6)}...${address.substring(
    address.length - 6,
    address.length
  )}`;
