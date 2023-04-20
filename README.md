# Altar of RAI

We are launching HAI, with the governance token LIT. 20% of the LIT supply will be used to buyback & burn FLX over the course of X years (~2-4). We want a contract to be the recipient of a LIT sablier stream, allow anyone to “poke” every month and transfer the LIT to the contract, and use it to buy FLX on cowswap.

1.  Every month - anyone can poke to claim LIT from sablier stream
2.  LIT tokens from sablier stream → cowswap auction to buy FLX
3.  FLX accumulated sits in the contract… (burned)

## Project Outline

- [x] Hardhat project initialization
- [x] Deploy local sablier
- [x] Deploy local LIT & FLX
- [x] Altar constructor
- [x] Altar treasury constructor
- [x] Start a stream from treasury to the Altar
- [ ] A utility for handling sablier deposit gotcha
- [x] Poke functionality - withdraw from stream
- [ ] Provide an ERC1271 interface to interact with CoW
- [x] Deploy a LIT & FLX testcoin on goerli
- [!] Make testcoins swappable using CoW
- [ ] Deploy script of the contract on the goerli
- [ ] Swap Keeper
- [ ] UI

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
- [ ] Understanding how to send a swap order off-chain on behalf of the smart contract

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

## Q&A

- do we have to worry about cross-chain → no, we can manually bridge the LIT tokens to mainnet and use a mainnet sablier stream
