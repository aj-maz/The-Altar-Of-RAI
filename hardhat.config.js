require("@nomicfoundation/hardhat-toolbox");

const GOERLI_PRIVATE_KEY =
  "dcc2cd461f09cedc108607d83672a0f958620991d8cee1fcfd9b3728debfde98";
//0x27c0861EDFfC1b9f1A19e796b519c8EeFA27091C

const GOERLI_RPC =
  "https://eth-goerli.g.alchemy.com/v2/l_THcPj6shiZ-E1LyKHnHeXx75E1iXrT";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    goerli: {
      url: GOERLI_RPC,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};
