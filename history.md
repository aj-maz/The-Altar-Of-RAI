Interacting with CoW using smart contracts was far more complex than I initialy estimated.
This week I mostly put time on trying to figure out how to make CoW work and what we need to take care of
Some of the things I learned

- [x] Undersating the CoW SDK and API
- [x] Understanding CoW Quote Params
- [x] Finding couple of good source codes to learn from
- [x] Finding the settlement contract domain seperator
- [x] Understanding GPv2Order library
- [x] Understanding how to sell tokens at current price no limit
- [x] Understanding the security pitfalls of ERC-1271 and how to securly implement it
- [x] Understanding how to send a swap order off-chain on behalf of the smart contract

## Q&A

- do we have to worry about cross-chain → no, we can manually bridge the LIT tokens to mainnet and use a mainnet sablier stream

## Components

- poke
  - sablier contract interface → claim stream
  - can only call this after 1 month
    - when poke, save timestamp, next poke only after 30 days
- buy FLX (same contract call)
  - cowswap contract interface → send bid in LIT for FLX
- UI
  - LIT remaining
  - FLX bought & burned
  - when is the next buyback / burn event (monthly countdown)
  - include the poke button on the UI → easy way for human to claim LIT & initiate FLX buyback

## Project Tasks

- [x] Hardhat project initialization
- [x] Deploy local sablier
- [x] Deploy local KITE & FLX
- [x] Altar constructor
- [x] Altar treasury constructor
- [x] Start a stream from treasury to the Altar
- [ ] A utility for handling sablier deposit gotcha
- [x] Poke functionality - withdraw from stream
- [x] Provide an ERC1271 interface to interact with CoW
- [x] Deploy a KITE & FLX testcoin on goerli
- [x] Make testcoins swappable using CoW
- [x] Deploy script of the contract on the goerli
- [x] Swap Keeper
- [x] UI

- [] FAQ
- [] running docs
- [] change docs
- [] poke audit doc
- [] mobile friendly
- [] UI cleanup
- [x] Managing keys and api in dotenv
- [x] Proper scripts for deployment
- [x] Altar contract cleanup
- [x] Removing CoW
- [x] Removing old auctions
- [x] Remove Subgraph
- [x] Change LIT to KITE
- [x] Contracts Docs
- [x] Remove the keeper
