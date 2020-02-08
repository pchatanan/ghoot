import React from 'react'
import { Header, SubHeader } from '../../ui'

const PlayerLobbyPage = props => {
  return <div>
    <Header>{props.gameName}</Header>
    <SubHeader>Welcome to the lobby, waiting for other players..</SubHeader>
  </div>
}

export default PlayerLobbyPage