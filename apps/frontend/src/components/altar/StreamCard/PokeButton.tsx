import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { useActiveWeb3React } from '../../../hooks'
import { usePokeCallback } from '../../../hooks/usePokeCallback'
import ConfirmationModal from '../../modals/ConfirmationModal'
import SwapModalFooter from '../../modals/common/PlaceOrderModalFooter'

const Container = styled.div`
  border: 2px solid black;
  padding: 3px;
  border-radius: 16px;
`

const DisabledButton = styled.div`
  border: 2px solid black;
  padding: 0.5em 2em;
  border-radius: 12px;
  font-size: 19px;
  background-color: #c8c8c8;
  cursor: not-allowed;
`

const ActiveButton = styled.div`
  border: 2px solid black;
  padding: 0.5em 2em;
  border-radius: 12px;
  font-size: 19px;
  background-color: #fda08b;
  transition: 200ms;
  cursor: pointer;
  &:hover {
    background-color: #ff6543;
  }
`

interface PokeButtonBody {
  diff: number
  finished: boolean
}

const timeFormatter = (diff: number) => {
  const seconds = 1000
  const minutes = 60 * seconds
  const hour = 60 * minutes
  const day = 24 * hour
  const month = 31 * day

  if (diff > month)
    return `${Math.floor(diff / month)} Month${Math.floor(diff / month) > 1 ? 's' : ''}`
  if (diff > day) return `${Math.floor(diff / day)} Day${Math.floor(diff / day) > 1 ? 's' : ''}`
  if (diff > hour) return `${Math.floor(diff / hour)} Hour${Math.floor(diff / hour) > 1 ? 's' : ''}`
  if (diff > minutes)
    return `${Math.floor(diff / minutes)} Minute${Math.floor(diff / minutes) > 1 ? 's' : ''}`
  return `${Math.floor(diff / seconds)} Second${Math.floor(diff / seconds) > 1 ? 's' : ''}`
}

const PokeButton = (props: PokeButtonBody) => {
  //      <ActiveButton>Poke Now!</ActiveButton>

  const { account, chainId, library } = useActiveWeb3React()

  const { diff, finished } = props
  const [pendingConfirmation, setPendingConfirmation] = useState<boolean>(true) // waiting for user confirmation

  const poke = usePokeCallback()
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirmed
  const [txHash, setTxHash] = useState<string>('')

  useEffect(() => {
    console.log(attemptingTxn)
  }, [attemptingTxn])

  if (finished)
    return (
      <Container>
        <DisabledButton>No more $KITE to sacrifice!</DisabledButton>
      </Container>
    )

  if (diff > 0)
    return (
      <Container>
        <DisabledButton>Can Poke in {timeFormatter(diff)}</DisabledButton>
      </Container>
    )

  if (!account) {
    return (
      <Container>
        <DisabledButton>Connect To Poke</DisabledButton>
      </Container>
    )
  }

  if (chainId !== 5) {
    return (
      <Container>
        <DisabledButton>Switch to Gnosis to Poke</DisabledButton>
      </Container>
    )
  }

  const resetModal = () => {
    setPendingConfirmation(true)
    setAttemptingTxn(false)
  }

  return (
    <>
      <Container>
        <ActiveButton
          onClick={() => {
            setShowConfirm(true)
            setAttemptingTxn(true)
            poke()
              .then((hash) => {
                setTxHash(hash)
                setPendingConfirmation(false)
              })
              .catch((err) => {
                resetModal()
                setShowConfirm(false)
              })
          }}
        >
          Poke Now
        </ActiveButton>
      </Container>
      <ConfirmationModal
        attemptingTxn={attemptingTxn}
        content={<div>Twt</div>}
        hash={txHash}
        isOpen={showConfirm}
        onDismiss={() => {
          resetModal()
          setShowConfirm(false)
        }}
        pendingConfirmation={pendingConfirmation}
        pendingText="Poking Altar"
        title="Poking Altar"
        width={504}
      />
    </>
  )
}

export default PokeButton
