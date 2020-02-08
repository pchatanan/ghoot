import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

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
  return <div>
    <div>End of the game</div>
    {player && <div>
      <div>{`Name: ${player.name}`}</div>
      <div>{`Score: ${player.score}`}</div>
    </div>}
  </div>
}

export default PlayerEndPage