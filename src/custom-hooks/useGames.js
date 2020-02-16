import React from 'react'
import { useSelector } from 'react-redux'
import { fs } from '..'

const useGames = () => {
  const [games, setGames] = React.useState([])
  const { user } = useSelector(state => state.global)
  React.useEffect(() => {
    console.log('useGames')
    fs.collection('users').doc(user.uid).collection('games').onSnapshot(snapshot => {
      if (!snapshot.empty) {
        var temp = []
        snapshot.forEach(doc => {
          temp.push({
            id: doc.id,
            data: doc.data()
          })
        })
        setGames(temp)
      }
    })
  }, [setGames, user.uid])
  return games
}

export default useGames