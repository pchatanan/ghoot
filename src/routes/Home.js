import React from 'react'
import useTextInput from '../custom-hooks/useTextInput'
import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import PlayerLobbyPage from './player/PlayerLobbyPage'
import PlayerQuestionPage from './player/PlayerQuestionPage'
import PlayerEndPage from './player/PlayerEndPage'
import { Header } from '../ui'
import Input from '../ui/Input'
import styled from 'styled-components'
import Button from '../ui/Button'
import LoadingPage from '../components/LoadingPage'

const HomeInput = styled(Input)`
    font-size: 1.5rem;
    font-family: Printable;
    margin-left: 10px;
    text-align: center;
`

const HomeContainer = styled.div`
    background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(109,98,46,1) 34%, rgba(255,233,59,1) 100%);
    positon: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const JoinButton = styled(Button)`
    font-size: 3rem;
    margin: 10px;
`

const Home = props => {
    const playerName = useTextInput()
    const passcode = useTextInput()
    const [ownerId, setOwnerId] = React.useState()
    const [ownerStatus, setOwnerStatus] = React.useState()
    const [game, setGame] = React.useState()
    const gameId = React.useMemo(() => ownerStatus && ownerStatus.gameId, [ownerStatus])
    const [roomId, setRoomId] = React.useState()
    const [joining, setJoining] = React.useState(false)
    const [joinStatus, setJoinStatus] = React.useState()
    React.useEffect(() => {
        console.log('Listen to account status')
        if (ownerId) {
            return firebase.firestore().collection('users').doc(ownerId).onSnapshot(doc => {
                console.log('owner status change')
                const newOwnerStatus = doc.data()
                if (newOwnerStatus.status === 'idle') {
                    setOwnerId(null)
                }
                setOwnerStatus(newOwnerStatus)
                setJoining(false)
                setJoinStatus()

            })
        }

    }, [ownerId])
    React.useEffect(() => {
        console.log('Listen to game status')
        if (ownerId && gameId) {
            return firebase.firestore().collection('users').doc(ownerId).collection('games').doc(gameId).onSnapshot(doc => {
                setGame(doc.data())
            })
        }

    }, [ownerId, gameId])

    if (ownerStatus && ownerStatus.status !== 'idle') {
        if (ownerStatus.status === 'lobby') {
            return <PlayerLobbyPage gameName={game && game.name} />
        }
        else if (ownerStatus.status === 'question') {
            return <PlayerQuestionPage question={game.questions[ownerStatus.question]} playerName={playerName.value} questionIndex={ownerStatus.question} roomId={ownerStatus.roomId} />
        }
        else if (ownerStatus.status === 'end') {
            return <PlayerEndPage roomId={roomId} playerName={playerName.value} />
        }
    }
    else {
        return <>
            {joining && <LoadingPage text={joinStatus} />}
            <HomeContainer>
                <Header>Enter your name</Header>
                <HomeInput {...playerName} />
                <Header>Input Passcode</Header>
                <HomeInput {...passcode} />
                <JoinButton onClick={e => {
                    setJoining(true)
                    setJoinStatus('finding room')
                    firebase.firestore().collection('rooms').where('status', '==', 'waiting').where('passcode', '==', passcode.value).get()
                        .then(querySnapshot => {
                            if (querySnapshot.size > 1) {
                                console.log('there are more than 1 room with this passcode.')
                                setJoining(false)
                            }
                            else if (querySnapshot.empty) {
                                console.log('No room with this passcode')
                                setJoining(false)
                            }
                            else if (querySnapshot.size === 1) {
                                setJoinStatus('room found')
                                var retrivedRoomId = null;
                                var retrivedOwnerId = null;
                                querySnapshot.forEach(doc => {
                                    retrivedRoomId = doc.id
                                    retrivedOwnerId = doc.data().owner
                                    setRoomId(retrivedRoomId)
                                })
                                // Create a reference to the SF doc.
                                var docRef = firebase.firestore().collection('rooms').doc(retrivedRoomId).collection('players').doc(playerName.value);

                                firebase.firestore().runTransaction((transaction) => {
                                    // This code may get re-run multiple times if there are conflicts.
                                    return transaction.get(docRef).then((playerDoc) => {
                                        if (playerDoc.exists) {
                                            throw new Error("This name already exists!");
                                        }
                                        else {
                                            return transaction.set(docRef, {
                                                name: playerName.value,
                                                score: 0
                                            })
                                        }
                                    })
                                }).then(() => {
                                    setJoinStatus('entering')
                                    console.log("Transaction successfully committed!");
                                    console.log('Player added to the room')
                                    setOwnerId(retrivedOwnerId)
                                    console.log('enter room')
                                }).catch(function (error) {
                                    console.log("Transaction failed: ", error);
                                    setJoining(false)
                                });
                            }
                        })
                }}>Join</JoinButton>
            </HomeContainer>
        </>
    }
}

export default Home