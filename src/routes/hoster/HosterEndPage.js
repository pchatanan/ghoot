import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useSelector } from 'react-redux'
import { GradientFullscreenDiv, SubHeader } from '../../ui'
import Button from '../../ui/Button'

const HosterEndPage = ({ topPlayers }) => {
  const { user } = useSelector(state => state.global)
  return <GradientFullscreenDiv>
    <SubHeader>End of the game</SubHeader>
    <ul>
      {topPlayers.map((player, playerIndex) => {
        return <li key={playerIndex}>{`${player.name}: ${player.score}`}</li>
      })}
    </ul>
    <Button onClick={e => {
      const fs = firebase.firestore()
      fs.collection('users').doc(user.uid).update({
        status: 'idle'
      })
    }}>End</Button>
  </GradientFullscreenDiv>
}

export default HosterEndPage