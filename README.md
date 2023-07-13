# Altar of RAI

Altar of RAI is a project developed for Reflexer DAO, which is responsible for RAI, a stablecoin built on the Ethereum blockchain. The project focuses on launching HAI, a multicollateral version of RAI, on the Optimism Layer 2 solution. HAI introduces the $KITE governance token, while $FLX serves as the governance token for RAI.

## Overview

The main objective of Altar of RAI is to facilitate a unique mechanism involving a Sablier stream and a Gnosis auction. The treasury streams \$KITE tokens into the Altar using Sablier, and upon interacting with the Altar, a method called "Poking" is triggered. This action initiates the following process:

1.  The Altar places all the streamed \$KITE tokens on a Gnosis auction.
2.  Participants in the auction can bid $FLX tokens for the $KITE tokens available.
3.  The \$FLX tokens received from the auction are returned to the Altar.
4.  The assumption is made that the received $FLX tokens are burned, thereby increasing the value of $FLX through the sacrifice of \$KITE tokens.

## Running

First read and run the `apps/smart-contract`, after properly deploying and initializing the smart-contracts go to `apps/frontend` and config it and run it.
