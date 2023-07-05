# Altar of RAI

Altar of RAI is a project developed for Reflexer DAO, which is responsible for RAI, a stablecoin built on the Ethereum blockchain. The project focuses on launching HAI, a multicollateral version of RAI, on the Optimism Layer 2 solution. HAI introduces the $KITE governance token, while $FLX serves as the governance token for RAI.

## Overview

The main objective of Altar of RAI is to facilitate a unique mechanism involving a Sablier stream and a Gnosis auction. The treasury streams \$KITE tokens into the Altar using Sablier, and upon interacting with the Altar, a method called "Poking" is triggered. This action initiates the following process:

1.  The Altar places all the streamed \$KITE tokens on a Gnosis auction.
2.  Participants in the auction can bid $FLX tokens for the $KITE tokens available.
3.  The \$FLX tokens received from the auction are returned to the Altar.
4.  The assumption is made that the received $FLX tokens are burned, thereby increasing the value of $FLX through the sacrifice of \$KITE tokens.

## Installation

To install and set up the Altar of RAI project, follow these steps:

1.  Clone the repository:

    `git clone https://github.com/Ajand/The-Altar-Of-RAI.git altar-contracts`

2.  Navigate to the project directory:
      
    `cd altar-contracts`

3.  Install the required dependencies:
      
    `npm install`

## Running & Scripts

To run the Altar of RAI project and execute various scripts, follow these steps:

1.  Copy the `.sample.env` file and rename it to `.env`. Fill in the necessary values in the `.env` file:

- `DEPLOYER_PRIVATE_KEY`: Private key of the deployer account used for contract deployment.
  - `GOERLI_RPC`: RPC URL for the Goerli testnet.
  - `MUMBAI_RPC`: RPC URL for the Mumbai testnet.
  - `ETHER_SCAN_KEY`: API key for Etherscan.
  - `TREASURY_ADDRESS`: Address of the treasury.
  - `STREAM_PERIOD`: Duration in seconds for each streaming period.
  - `POKE_COOLDOWN`: Duration in seconds for the cooldown period between pokes.
  - `AUCTION_TIME`: Duration in seconds for the Gnosis auction.

2.  Deploy the Altar contract:
      
    `npx hardhat run scripts/deployAltar.js --network <network-name>`

    Replace `<network-name>` with the desired network (e.g., `goerli`, `mumbai`, etc.).

    This script deploys the Altar contract.

3.  Deploy the Treasury contract:
      
    `npx hardhat run scripts/deployTreasury.js --network <network-name>`

    Replace `<network-name>` with the desired network (e.g., `goerli`, `mumbai`, etc.).

    This script deploys the Treasury contract.

4.  Deploy both the Altar and Treasury contracts:
      
    `npx hardhat run scripts/deployAltarAndTreasury.js --network <network-name>`

    Replace `<network-name>` with the desired network (e.g., `goerli`, `mumbai`, etc.).

    This script deploys both the Altar and Treasury contracts.

5.  Start the stream:
      
    `npx hardhat run scripts/startStream.js --network <network-name>`

    Replace `<network-name>` with the desired network (e.g., `goerli`, `mumbai`, etc.).

    This script starts the streaming process, which is the official start of the Altar.

Please ensure that you have set up the required network configurations in the `hardhat.config.js` file before executing the scripts.

**You may need to change `.env` file to make sure it has the proper values before running each script.**

**Additionally you may want to change the addresses.json file for customizing the addresses**

## Running Tests

Altar of RAI includes unit tests to ensure the correctness of the implemented functionality. Here's how you can run the tests:

1.  Make sure you are in the project directory: `cd altar-of-rai`

2.  Run the tests using the following command:

    shellCopy code

    `npx hardhat test`

    This command will execute all the test files located in the `tests/` directory and display the test results.
