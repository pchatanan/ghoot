import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { Header } from '../../ui'
import styled from 'styled-components'

const StopButton = styled(Button)`
  background: lightgrey;
  width: 20vw;
`

const StartButton = styled(Button)`
  width: 20vw;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

const HosterLobbyPage = props => {
  const { user, accountStatus } = useSelector(state => state.global)
  const [players, setPlayers] = React.useState([])


  const onEndClick = React.useCallback(e => {
    const fs = firebase.firestore()
    var batch = fs.batch()
    var hosterRef = fs.collection('users').doc(user.uid)
    batch.update(hosterRef, {
      status: 'idle',
      question: 0
    })
    var roomRef = fs.collection('rooms').doc(accountStatus.roomId)
    batch.update(roomRef, {
      status: 'ended'
    })
    batch.commit().then(() => {
      console.log('Game ended')
    })

  }, [accountStatus.roomId, user.uid])




  React.useEffect(() => {
    console.log('listen to players in lobby')
    return firebase.firestore().collection('rooms').doc(accountStatus.roomId).collection('players').onSnapshot(snapshot => {
      if (snapshot.empty) {
        console.log('NO players')
      }
      else {
        var temp = []
        snapshot.forEach(playerDoc => {
          temp.push(playerDoc.data())
        })
        setPlayers(temp)
      }
    })
  }, [accountStatus.roomId])
  return <div>
    <Header>Waiting for people to join room...</Header>
    <Header>{`Passcode: ${accountStatus.passcode}`}</Header>
    <ButtonContainer>
      <StartButton onClick={e => {
        var fs = firebase.firestore()
        var batch = fs.batch()
        var hosterRef = fs.collection('users').doc(user.uid)
        batch.update(hosterRef, {
          status: 'question',
          question: 0
        })
        var roomRef = fs.collection('rooms').doc(accountStatus.roomId)
        batch.update(roomRef, {
          status: 'played'
        })
        batch.commit().then(() => {
          console.log('Game started')
        })
      }}>Start</StartButton>
      <StopButton onClick={onEndClick}>Stop</StopButton>
    </ButtonContainer>
    <h2>{`${players.length} in the room`}</h2>
    <ul>
      {players.map((player, playerIndex) => {
        return <li key={playerIndex}>{player.name}</li>
      })}
    </ul>
  </div>
}

export default HosterLobbyPage