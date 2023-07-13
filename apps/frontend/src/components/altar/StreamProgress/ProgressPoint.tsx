import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
  position: relative;
`

const ContainerMobile = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  z-index: 100;
  position: relative;
`

const Point = styled.div`
  width: 25px;
  height: 25px;
  background-color: #ff6543;
  border-radius: 100px;
  border: 2px solid black;
`

const ContentHolder = styled.p`
  border: 2px solid black;
  padding: 0.2em 0.5em;
  border-radius: 14px;
  margin: 0px;
  text-align: center;
  transition: 200ms;
  width: 170px;
  height: 35px;
  font-size: 16px;
  &:hover {
    background: #ffdfd8;
  }
`

const Connector = styled.div`
  height: 30px;
  border-right: 2px dotted black;
`

const ConnectorMobile = styled.div`
  width: 30px;
  border-top: 2px dotted black;
`

interface ProgressPoint {
  content: string
  mobile: boolean
}

const ProgressPoint = (props: ProgressPoint) => {
  const { content, mobile } = props

  if (mobile)
    return (
      <ContainerMobile>
        <ContentHolder>{content}</ContentHolder>
        <ConnectorMobile />
        <Point />
      </ContainerMobile>
    )

  return (
    <Container>
      <ContentHolder>{content}</ContentHolder>
      <Connector />
      <Point />
    </Container>
  )
}

export default ProgressPoint
