import React from 'react'
import styled from 'styled-components'

interface RightSider {
  rightSide: boolean
}

interface Mobile {
  bottom: boolean
}

const TreasuryHolder = styled.div<RightSider>`
  border: 2px dashed black;
  color: black;
  display: inline-block;
  position: absolute;
  top: 55px;
  height: 100px;
  ${(props) => (props.rightSide ? `right: 0px;` : `left: 0px;`)}
  width: 210px;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const TreasuryHolderMobile = styled.div<Mobile>`
  border: 2px dashed black;
  color: black;
  display: inline-block;
  position: absolute;
  ${(props) => (props.bottom ? `bottom: 50px;` : `top: 50px;`)}
  height: 100px;
  left: -25px;
  width: 210px;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(-90deg);
`

const Label = styled.h4<RightSider>`
  position: absolute;
  top: -15px;
  ${(props) => (props.rightSide ? `right: 10px;` : `left: 10px;`)}
  margin-top: 0px;
  margin-bottom: 0px;
  padding: 0.2em 0.7em;
  border: 2px solid black;
  background-color: white;
  border-radius: 100px;
`

const Content = styled.p`
  text-align: center;
  width: 100%;
  font-size: 20px;
`

interface StreamCardBody {
  label: string
  content: string
  rightSide: boolean
  mobile: boolean
  bottom: boolean
}

const StreamData = (props: StreamCardBody) => {
  const { bottom, mobile } = props

  if (mobile) {
    return (
      <TreasuryHolderMobile bottom={props.bottom}>
        <Label rightSide={props.rightSide}>{props.label}</Label>
        <Content>{props.content}</Content>
      </TreasuryHolderMobile>
    )
  }

  return (
    <TreasuryHolder rightSide={props.rightSide}>
      <Label rightSide={props.rightSide}>{props.label}</Label>
      <Content>{props.content}</Content>
    </TreasuryHolder>
  )
}

export default StreamData
