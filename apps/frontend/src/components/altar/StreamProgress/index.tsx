import styled from 'styled-components'

import ProgressPoint from './ProgressPoint'

const Container = styled.div`
  width: 600px;
  position: relative;
  color: black;
  font-size: 16px;
  left: 100px;
  z-index: 80;
`

const MobileContainer = styled.div`
  width: 300px;
  position: relative;
  color: black;
  font-size: 16px;
  left: 25px;
  z-index: 80;
`

const PointsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const PointsContainerMobile = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  min-height: 450px;
`

const ProgressBar = styled.div`
  width: calc(100% - 160px);
  height: 12px;
  border: 2px solid black;
  background-color: #ffdfd8;
  margin-left: 80px;
  position: absolute;
  top: 71px;
`

const ProgressBarMobile = styled.div`
  width: 12px;
  height: 400px;
  border: 2px solid black;
  background-color: #ffdfd8;
  margin-left: 81px;
  position: absolute;
  top: 25px;
`

interface ProgressIndicatorProps {
  progress: number
}

const ProgressIndicator = styled.div<ProgressIndicatorProps>`
  width: ${({ progress }) => `calc(${(progress / 100) * 68 + 30}% - 160px)`};
  height: 12px;
  border: 2px solid black;
  background-color: #ff6543;
  margin-left: 80px;
  position: absolute;
  top: 71px;
  border-radius: 15px;
  transition: 200ms;
`

const ProgressIndicatorMobile = styled.div<ProgressIndicatorProps>`
  height: ${({ progress }) => `calc(${(progress / 100) * 392}px + 8px)`};
  width: 12px;
  border: 2px solid black;
  background-color: #ff6543;
  margin-left: 81px;
  position: absolute;
  top: 25px;
  border-radius: 15px;
  transition: 200ms;
`

const ProgressText = styled.p`
  text-align: center;
  margin-top: 4px;
`

const desktopBreakpoint = '768px'

const DesktopView = styled.div`
  display: none;

  @media (min-width: ${desktopBreakpoint}) {
    display: block;
  }
`

// Styled component for MobileView
const MobileView = styled.div`
  display: block;

  @media (min-width: ${desktopBreakpoint}) {
    display: none;
  }
`

interface ProgressInfo {
  startText: string
  endText: string
  rate: string
  progress: number
  mobile: Maybe<boolean>
}

const StreamProgress = (props: ProgressInfo) => {
  const { endText, mobile, progress, rate, startText } = props

  if (mobile) {
    return (
      <MobileContainer>
        <PointsContainerMobile>
          <ProgressPoint content={startText} mobile />
          <ProgressPoint content={endText} mobile />
        </PointsContainerMobile>
        <ProgressBarMobile />
        <ProgressIndicatorMobile progress={progress} />
      </MobileContainer>
    )
  }

  return (
    <Container>
      <PointsContainer>
        <ProgressPoint content={startText} mobile={false} />
        <ProgressPoint content={endText} mobile={false} />
      </PointsContainer>
      <ProgressBar />
      <ProgressIndicator progress={progress} />
      <ProgressText>{rate} $KITE/second -&gt;</ProgressText>
    </Container>
  )
}

export default StreamProgress
