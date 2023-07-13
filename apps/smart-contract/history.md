Interacting with CoW using smart contracts was far more complex than I initialy estimated.
This week I mostly put time on trying to figure out how to make CoW work and what we need to take care of
Some of the things I learned

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
