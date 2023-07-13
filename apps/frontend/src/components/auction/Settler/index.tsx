import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { useSettleCallback } from '../../../hooks/useSettleCallback'
import { DerivedAuctionInfo } from '../../../state/orderPlacement/hooks'
import { AuctionIdentifier } from '../../../state/orderPlacement/reducer'
import { Button } from '../../buttons/Button'
import { BaseCard } from '../../pureStyledComponents/BaseCard'

interface Props {
  auctionIdentifier: AuctionIdentifier
  derivedAuctionInfo: DerivedAuctionInfo
}

const Wrapper = styled(BaseCard)`
  max-width: 100%;
  min-height: 352px;
  min-width: 100%;
  height: calc(100% - 35px);
`

const ActionButton = styled(Button)`
  flex-shrink: 0;
  height: 52px;
  margin-top: auto;
`

const Info = styled.p`
  color: black;
  font-size: 22px;
`

const Settler: React.FC<Props> = (props) => {
  const { auctionIdentifier, derivedAuctionInfo } = props

  const [settling, setSettling] = useState('')

  console.log(auctionIdentifier, derivedAuctionInfo, 'from settler')

  const settle = useSettleCallback(auctionIdentifier)

  return (
    <Wrapper>
      <Info>Auction is finished but it must get settled before you can claim your coins.</Info>
      <ActionButton
        onClick={() => {
          settle()
        }}
      >
        Settle Auction
      </ActionButton>
    </Wrapper>
  )
}

export default Settler
