import React from 'react'
import styled from 'styled-components'

import { HashLink } from 'react-router-hash-link'

import ActiveAuction from '../../components/altar/ActiveAuction'
import StreamCard from '../../components/altar/StreamCard'
import { InlineLoading } from '../../components/common/InlineLoading'
import { useAllAuctionInfo } from '../../hooks/useAllAuctionInfos'
import { useAltarData } from '../../hooks/useAltarDetails'
import { useSetNoDefaultNetworkId } from '../../state/orderPlacement/hooks'

const Container = styled.div`
  margin-top: 4em;
`

export const Landing: React.FC = () => {
  const allAuctions = useAllAuctionInfo()

  const altarData = useAltarData()

  const allAuctionsSorted = allAuctions
    ?.sort((a, b) => {
      return b.endTimeTimestamp - a.endTimeTimestamp
      // const aStatus = new Date(a.endTimeTimestamp * 1000) > new Date() ? 'Ongoing' : 'Ended'
      // const bStatus = new Date(b.endTimeTimestamp * 1000) > new Date() ? 'Ongoing' : 'Ended'
      // return bStatus.localeCompare(aStatus) || b.interestScore - a.interestScore
    })
    .filter((auction) => auction.chainId === '0x05')
    .filter((auction) =>
      altarData.altarInfo?.auctions
        .map((id) => Number(id).toString())
        .includes(String(auction.auctionId)),
    )

  useSetNoDefaultNetworkId()

  const activeAuction =
    allAuctionsSorted &&
    new Date(Number(allAuctionsSorted[0]?.endTimeTimestamp) * 1000) > new Date()
      ? allAuctionsSorted[0]
      : null

  if (altarData.loading || !allAuctions) return <InlineLoading />
  if (!altarData.altarInfo) return <InlineLoading />
  return (
    <Container>
      {activeAuction && <ActiveAuction auction={activeAuction} />}
      <StreamCard altarInfo={altarData.altarInfo} />
    </Container>
  )
}
