require("@nomicfoundation/hardhat-toolbox");

const GOERLI_PRIVATE_KEY =
  "9ad95af9bacfa8d4c4a9958104a773145104a03c349bb0d1b58c9c52b25c5f5b";
//0xcC2a0011B1Db2BeB2A0E2a48fB7Dc6CA2E044A0a

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
