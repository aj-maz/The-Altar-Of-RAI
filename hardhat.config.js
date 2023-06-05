require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

const GOERLI_PRIVATE_KEY =
  "305cc1d841d44e9080febe06d2a478031fd30cc7d259611d1d7f55347cd68edb";
//0x0E74907aC06260169C4D38231FbD44f6B21FE15A

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
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: { goerli: "XKD169WPEB3MJVFHX92D6TMJV5VPREAZ1P" },
  },
};
