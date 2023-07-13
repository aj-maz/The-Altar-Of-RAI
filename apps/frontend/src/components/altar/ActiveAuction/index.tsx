import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface ActiveAuctionBody {
  auction: any
}

const Container = styled.div`
  padding: 1em;
  color: black;
  font-size: 18px;
  border: 2px solid black;
  margin-bottom: 10px;
  border-radius: 14px;
`

const BidNow = styled.span`
  color: #ff6543;
  font-size: 22px;
  font-weight: bold;
  cursor: pointer;
`

const ActiveAuction = (props: ActiveAuctionBody) => {
  const { auction } = props
  const navigate = useNavigate()

  return (
    <Container>
      There is an active auction happening right now.{' '}
      <BidNow
        onClick={() => {
          navigate(`/auction?auctionId=${auction.auctionId}&chainId=5`)
        }}
      >
        Bid Now!
      </BidNow>
    </Container>
  )
}

export default ActiveAuction
