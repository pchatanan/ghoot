import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

const useTopPlayers = (roomId, limit) => {
  const [topPlayers, setTopPlayers] = React.useState([])
  React.useEffect(() => {
    if (roomId) {
      console.log('useTopPlayers')
      firebase.firestore().collection('rooms').doc(roomId).collection('players').orderBy('score', 'desc').limit(limit).onSnapshot(snapshot => {
        if (!snapshot.empty) {
          var temp = []
          snapshot.forEach(doc => {
            temp.push(doc.data())
          })
          setTopPlayers(temp)
        }
      })
    }
  }, [roomId, limit])

  return topPlayers
}

export default useTopPlayers