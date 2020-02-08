import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useSelector } from 'react-redux'

const HosterEndPage = ({ topPlayers }) => {
  const { user } = useSelector(state => state.global)
  return <div>
    <div>End of the game</div>
    <ul>
      {topPlayers.map((player, playerIndex) => {
        return <li key={playerIndex}>{`${player.name}: ${player.score}`}</li>
      })}
    </ul>
    <button onClick={e => {
      const fs = firebase.firestore()
      fs.collection('users').doc(user.uid).update({
        status: 'idle'
      })
    }}>End</button>
  </div>
}

export default HosterEndPage