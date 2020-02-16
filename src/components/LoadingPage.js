import React from 'react'
import { GradientFullscreenDiv, CenterContainer } from '../ui'
import Loading from './Loading'
import styled from 'styled-components'

const LoadingPageContainer = styled(GradientFullscreenDiv)`
  z-index: 12;
  display: ${props => props.show ? 'block' : 'none'};
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TextContainer = styled.div`
  font-size: 2rem;
`

const LoadingPage = ({ text, show }) => {
  return <LoadingPageContainer show={show}>
    <CenterContainer>
      <ContentContainer>
        <Loading />
        <TextContainer>{text}</TextContainer>
      </ContentContainer>
    </CenterContainer>
  </LoadingPageContainer>
}

export default LoadingPage