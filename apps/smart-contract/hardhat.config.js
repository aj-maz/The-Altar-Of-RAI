require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const GOERLI_RPC = process.env.GOERLI_RPC;
const MUMBAI_RPC = process.env.MUMBAI_RPC;
const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY;

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
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
    mumbai: {
      url: MUMBAI_RPC,
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: { goerli: ETHERSCAN_KEY },
  },
};
