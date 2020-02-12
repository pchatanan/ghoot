import React from 'react'
import { Header, SubHeader, GradientFullscreenDiv, CenterContainer } from '../../ui'

const PlayerLobbyPage = props => {
  return <GradientFullscreenDiv>
    <CenterContainer>
      <Header>{props.gameName}</Header>
      <SubHeader>Welcome to the lobby, waiting for other players..</SubHeader>
    </CenterContainer>
  </GradientFullscreenDiv>
}

export default PlayerLobbyPage