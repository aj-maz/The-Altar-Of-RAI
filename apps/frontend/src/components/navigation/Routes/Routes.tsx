import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import ReactTooltip from 'react-tooltip'

import Auction from '../../../pages/Auction'
import { Landing } from '../../../pages/Landing'
import Overview from '../../../pages/Overview'
import { CookiesBanner } from '../../common/CookiesBanner'
import { Footer } from '../../layout/Footer'
import { Header } from '../../layout/Header'
import Popups from '../../popups/Popups'
import { BaseCard } from '../../pureStyledComponents/BaseCard'
import { InnerContainer } from '../../pureStyledComponents/InnerContainer'
import { MainScroll } from '../../pureStyledComponents/MainScroll'
import { MainWrapper } from '../../pureStyledComponents/MainWrapper'
import Web3ReactManager from '../../web3/Web3ReactManager'

const Inner = styled(InnerContainer)`
  padding-top: 22px;
`

const AppRoutes: React.FC = () => {
  const location = useLocation()
  const [showCookiesBanner, setShowCookiesBanner] = React.useState(false)
  const [showTopWarning, setShowTopWarning] = React.useState(false)

  const tokenSupport = (bothTokensSupported: boolean) => {
    setShowTopWarning(bothTokensSupported)
  }

  React.useEffect(() => {
    if (!location.pathname.includes('/auction')) {
      setShowTopWarning(false)
    }
  }, [location])

  return (
    <MainWrapper>
      <Header />
      <MainScroll>
        <Popups />
        <ReactTooltip
          arrowColor="#001429"
          backgroundColor="#001429"
          border
          borderColor="#174172"
          className="customTooltip"
          delayHide={250}
          delayShow={50}
          effect="solid"
          textColor="#fff"
        />
        {/* <HeaderBanner /> */}
        <span id="topAnchor" />
        <Inner>
          <Web3ReactManager>
            <Routes>
              <Route element={<Auction showTokenWarning={tokenSupport} />} path="/auction" />
              <Route element={<Overview />} path="/overview" />
              <Route element={<Landing />} path="/start" />
              <Route element={<Navigate to="/start" />} path="/" />
              <Route element={<BaseCard>Page not found Error 404</BaseCard>} path="*" />
            </Routes>
          </Web3ReactManager>
        </Inner>
        <Footer />
      </MainScroll>
      <CookiesBanner
        isBannerVisible={showCookiesBanner}
        onHide={() => {
          setShowCookiesBanner(false)
        }}
      />
    </MainWrapper>
  )
}

export default AppRoutes
