import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { GradientFullscreenDiv, CenterContainer, SubHeader, Header } from '../../ui'

const PlayerEndPage = ({ roomId, playerName }) => {
  const [player, setPlayer] = React.useState()
  React.useEffect(() => {
    const fs = firebase.firestore()
    return fs.collection('rooms').doc(roomId).collection('players').doc(playerName).onSnapshot(doc => {
      if (doc.exists) {
        setPlayer(doc.data())
      }
    })
  }, [roomId, playerName])
  return <GradientFullscreenDiv>
    <CenterContainer>
    <SubHeader>End of the game</SubHeader>
    {player && <>
      <Header>{`Name: ${player.name}`}</Header>
      <Header>{`Score: ${player.score}`}</Header>
    </>}
    </CenterContainer>
  </GradientFullscreenDiv>
}

export default PlayerEndPage