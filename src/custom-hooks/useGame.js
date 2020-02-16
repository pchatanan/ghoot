import React from 'react'
import { useSelector } from 'react-redux'
import { fs } from '..'

const useGame = (gameId) => {
  const { user } = useSelector(state => state.global)
  const [game, setGame] = React.useState()

  React.useEffect(() => {
    if (gameId) {
      console.log('get game')
      fs.collection('users').doc(user.uid).collection('games').doc(gameId).get()
        .then(gameDoc => {
          setGame(gameDoc.data())
        })
    }
  }, [gameId, user.uid])

  return game
}

export default useGame