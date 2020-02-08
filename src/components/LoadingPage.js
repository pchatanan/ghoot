import React from 'react'
import { FullscreenDiv, CenterContainer } from '../ui'
import Loading from './Loading'
import styled from 'styled-components'

const LoadingPageContainer = styled(FullscreenDiv)`
  position: fixed;
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(109,98,46,1) 34%, rgba(255,233,59,1) 100%);
  width: 100vw;
  height: 100vh;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TextContainer = styled.div`
  font-size: 2rem;
`

const LoadingPage = ({ text }) => {
  return <LoadingPageContainer>
    <CenterContainer>
      <ContentContainer>
        <Loading />
        <TextContainer>{text}</TextContainer>
      </ContentContainer>
    </CenterContainer>
  </LoadingPageContainer>
}

export default LoadingPage