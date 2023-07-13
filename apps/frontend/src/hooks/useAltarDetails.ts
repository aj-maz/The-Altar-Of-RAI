import { ethers } from 'ethers'
import { useEffect, useMemo, useState } from 'react'

import { Contract, Provider } from 'ethers-multicall'

import AltarABI from '../constants/abis/altar/altar.json'
import ERC20ABI from '../constants/abis/erc20/erc20.json'
import SablierABI from '../constants/abis/sablier/sablier.json'
import { ALTAR_NETWORK, FLX_NETWORK, KITE_NETWORK, SABLIER_NETWORK } from '../utils'
import { getLogger } from '../utils/logger'

const logger = getLogger('useAuctionDetails')

export interface AltarStreamData {
  deposit: ethers.BigNumber
  ratePerSecond: ethers.BigNumber
  sender: string
  startTime: Date
  stopTime: Date
  streamBalanceOfAltar: ethers.BigNumber
  streamBalanceOfTreasury: ethers.BigNumber
  remainingBalance: ethers.BigNumber
  token: string
}

export interface AltarInfoDetails {
  streamId: ethers.BigNumber
  streamData: Maybe<AltarStreamData>
  nextPokeTime: Date
  pokeCooldown: ethers.BigNumber
  altarKiteBalance: ethers.BigNumber
  altarFlxBalance: ethers.BigNumber
  auctions: ethers.BigNumber[]
}

export const useAltarData = () => {
  const [altarInfo, setAltarInfo] = useState<Maybe<AltarInfoDetails>>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const main = useMemo(() => {
    const provider = new ethers.providers.AlchemyProvider(
      'goerli',
      'l_THcPj6shiZ-E1LyKHnHeXx75E1iXrT',
    )
    const ethcallProvider = new Provider(provider)

    const altarContract = new Contract(ALTAR_NETWORK[5], AltarABI)
    const sablierContract = new Contract(SABLIER_NETWORK[5], SablierABI)
    const FLX = new Contract(FLX_NETWORK[5], ERC20ABI)
    const KITE = new Contract(KITE_NETWORK[5], ERC20ABI)

    return async (initial: boolean) => {
      if (initial) {
        setLoading(true)
      }
      await ethcallProvider.init()

      const streamId = altarContract.streamId()
      const altarKiteBalance = KITE.balanceOf(altarContract.address)
      const altarFlxBalance = FLX.balanceOf(altarContract.address)
      const nextPokeTime = altarContract.nextPokeTime()
      const pokeCooldown = altarContract.pokeCooldown()
      const auctions = altarContract.getAuctions()

      try {
        const data = await ethcallProvider.all([
          streamId,
          altarKiteBalance,
          altarFlxBalance,
          nextPokeTime,
          pokeCooldown,
          auctions,
        ])

        const streamInfo = sablierContract.getStream(data[0])

        const dateFormatter = (bN: ethers.BigNumber) => {
          return new Date(bN.toNumber() * 1000)
        }

        try {
          const streamData = await ethcallProvider.all([streamInfo])
          const streamBalanceOfAltar = sablierContract.balanceOf(data[0], altarContract.address)
          const streamBalanceOfTreasury = sablierContract.balanceOf(data[0], streamData[0].sender)

          const streamBalanceData = await ethcallProvider.all([
            streamBalanceOfAltar,
            streamBalanceOfTreasury,
          ])
          setAltarInfo({
            streamId: data[0],
            altarKiteBalance: data[1],
            altarFlxBalance: data[2],
            nextPokeTime: dateFormatter(data[3]),
            pokeCooldown: data[4],
            auctions: data[5],
            streamData: {
              deposit: streamData[0].deposit,
              ratePerSecond: streamData[0].ratePerSecond,
              sender: streamData[0].sender,
              startTime: dateFormatter(streamData[0].startTime),
              stopTime: dateFormatter(streamData[0].stopTime),
              remainingBalance: streamData[0].remainingBalance,
              token: streamData[0].token,
              streamBalanceOfAltar: streamBalanceData[0],
              streamBalanceOfTreasury: streamBalanceData[1],
            },
          })
        } catch (err) {
          console.log(err)

          setAltarInfo({
            streamId: data[0],
            altarKiteBalance: data[1],
            altarFlxBalance: data[2],
            nextPokeTime: dateFormatter(data[3]),
            pokeCooldown: data[4],
            auctions: data[5],
            streamData: null,
          })
        }

        if (initial) {
          setLoading(false)
        }
      } catch (err) {
        console.log(err)
        if (initial) {
          setLoading(false)
          setAltarInfo(null)
        }
        logger.error('Error getting altar details', err)
      }
    }
  }, [])

  useEffect(() => {
    main(true)
    setInterval(() => {
      main(false)
    }, 10000)
  }, [main])

  const refetch = () => main(false)

  return { loading, altarInfo, refetch }
}
