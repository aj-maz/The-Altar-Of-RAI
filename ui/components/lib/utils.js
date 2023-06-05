export const dateFormat = "YYYY/MM/DD HH:mm:ss";

export const explorer = "https://goerli.etherscan.io";

export const formatAddress = (address, len = 6) =>
  `${address.substring(0, len)}...${address.substring(
    address.length - len,
    address.length
  )}`;
