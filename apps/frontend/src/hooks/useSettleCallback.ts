import { useMemo } from 'react'

import { prepareWriteContract, writeContract } from '@wagmi/core'

import { useActiveWeb3React } from './index'
import EASY_AUCTION_ABI from '../constants/abis/easyAuction/easyAuction.json'
import { AuctionIdentifier } from '../state/orderPlacement/reducer'
import { useTransactionAdder } from '../state/transactions/hooks'
import { getEasyAuctionAddress } from '../utils'
import { getLogger } from '../utils/logger'

const logger = getLogger('useSettleCallback')

export function useSettleCallback(auctionIdentifier: AuctionIdentifier) {
  const { account, chainId, library } = useActiveWeb3React()
  const { auctionId } = auctionIdentifier

  const addTransaction = useTransactionAdder()

  return useMemo(() => {
    return async function onPlaceOrder() {
      if (!chainId || !library || !account) {
        throw new Error('missing dependencies in onPlaceOrder callback')
      }

      const { request } = await prepareWriteContract({
        // @ts-ignore
        address: getEasyAuctionAddress(5),
        // @ts-ignore
        abi: EASY_AUCTION_ABI,
        // @ts-ignore
        functionName: 'settleAuction',
        // @ts-ignore
        args: [auctionId],
      })

      return writeContract(request)
        .then((response) => {
          addTransaction(response, {
            summary: `Settling acution - ${auctionId.toString()}`,
          })

          return response.hash
        })
        .catch((error) => {
          console.log(error)
          logger.error('Error writing transaction', error)
          throw error
        })
    }
  }, [auctionId, account, chainId, library, addTransaction])
}
