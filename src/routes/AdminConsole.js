import React from 'react'
import useGames from '../custom-hooks/useGames'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useSelector } from 'react-redux'
import useTextInput from '../custom-hooks/useTextInput'
import { Header, SubHeader } from '../ui'
import styled from 'styled-components'
import Button from '../ui/Button'
import Input from '../ui/Input'

const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const Card = styled.div`
    background: white;
    border-radius: 14px;
    margin: 7px;
    padding: 14px;
    box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.4);
`

const CardTitle = styled.div`
    font-size: 2rem;
`

const PasscodeLabel = styled.label`
    margin-left: 10px;
`

const PassCodeSubHeader = styled(SubHeader)`
    display: inline-block;
`

const PasscodeInput = styled(Input)`
    font-size: 1.5rem;
    font-family: Printable;
    margin-left: 10px;
`

const AdminConsole = props => {
    const games = useGames()
    const passcode = useTextInput()
    const { user } = useSelector(state => state.global)
    return <div>
        <Header>Admin console</Header>
        <PasscodeLabel>
            <PassCodeSubHeader>Room Passcode</PassCodeSubHeader>
            <PasscodeInput {...passcode} />
        </PasscodeLabel>
        <CardContainer>
            {games.map((game, gameIndex) => {
                return <Card key={gameIndex}>
                    <CardTitle>{game.data.name}</CardTitle>
                    <Button onClick={e => {
                        firebase.firestore().collection('users').doc(user.uid).collection('games').doc(game.id).delete()
                            .then(() => { console.log('Game deleted') })
                    }}>Delete</Button>
                    <Button onClick={e => {
                        firebase.firestore().collection('rooms').where("status", "==", "waiting").where("passcode", "==", passcode.value).get()
                            .then(snapshot => {
                                if (snapshot.size === 0) {
                                    firebase.firestore().collection('users').doc(user.uid).update({
                                        status: 'create_room',
                                        gameId: game.id,
                                        passcode: passcode.value,
                                        roomId: null
                                    })
                                        .then(() => { console.log('start play') })
                                }
                                else {
                                    console.log('passcode is in use')
                                }
                            })

                    }}>Start game</Button>
                </Card>
            })}
        </CardContainer>
    </div>
}

export default AdminConsole