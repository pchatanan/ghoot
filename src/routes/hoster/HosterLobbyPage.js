import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { Header, GradientFullscreenDiv, SubHeader } from '../../ui'
import styled from 'styled-components'

const LobbyContainer = styled(GradientFullscreenDiv)`
  display: flex;
  flex-direction: column;
`

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

const PlayerNameContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  padding: 5px;
  overflow: auto;
`

const PlayerName = styled.div`
  margin: 5px;
  background: white;
  box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.4);
  padding: 10px;
  radius: 10px;
  border-radius: 10px;
  text-align: center;
  font-size: 1.5rem;
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
    return firebase.firestore().collection('rooms').doc(accountStatus.roomId).collection('players').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
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
  return <LobbyContainer>
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
    <SubHeader>{`${players.length} in the room`}</SubHeader>
    <PlayerNameContainer>
      {players.map((player, playerIndex) => {
        return <PlayerName key={playerIndex}>{player.name}</PlayerName>
      })}
    </PlayerNameContainer>
  </LobbyContainer>
}

export default HosterLobbyPage