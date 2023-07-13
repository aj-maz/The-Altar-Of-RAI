import { useEffect, useState } from 'react'
import styled from 'styled-components'

import PokeButton from './PokeButton'
import { AltarInfoDetails } from '../../../hooks/useAltarDetails'
import { formatAmount } from '../../../utils'

const Container = styled.div`
  padding: 1em;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InfoBox = styled.h2``

interface AltarActionBody {
  altarInfo: AltarInfoDetails
}

const AltarAction = (props: AltarActionBody) => {
  const { altarInfo } = props
  const [referesher, setRefersher] = useState(0)

  const pokeDiff = Number(altarInfo.nextPokeTime) - Number(new Date())

  useEffect(() => {
    const a = setInterval(() => {
      setRefersher((refersher) => refersher + 1)
    }, 1000)

    return () => clearInterval(a)
  }, [])

  return (
    <Container>
      <InfoBox>Burned: {formatAmount(altarInfo.altarFlxBalance)} $FLX</InfoBox>
      <PokeButton diff={pokeDiff} finished={!altarInfo.streamData} />
    </Container>
  )
}

export default AltarAction
