import { useMemo } from 'react'

import { prepareWriteContract, writeContract } from '@wagmi/core'

import { useActiveWeb3React } from './index'
import AltarABI from '../constants/abis/altar/altar.json'
import { useTransactionAdder } from '../state/transactions/hooks'
import { ALTAR_NETWORK } from '../utils'
import { getLogger } from '../utils/logger'

const logger = getLogger('usePokeCallback')

export function usePokeCallback() {
  const addTransaction = useTransactionAdder()

  return useMemo(() => {
    return async function onPoke() {
      const { request } = await prepareWriteContract({
        // @ts-ignore
        address: ALTAR_NETWORK[5],
        // @ts-ignore
        abi: AltarABI,
        // @ts-ignore
        functionName: 'poke',
      })

      return writeContract(request)
        .then((response) => {
          addTransaction(response, {
            summary: 'Poking Altar ',
          })
          return response.hash
        })
        .catch((error) => {
          logger.error('Error writing transaction', error)
          throw error
        })
    }
  }, [addTransaction])
}
