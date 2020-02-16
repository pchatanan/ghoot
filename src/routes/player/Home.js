import React from 'react'
import useTextInput from '../../custom-hooks/useTextInput'
import PlayerLobbyPage from './PlayerLobbyPage'
import PlayerQuestionPage from './PlayerQuestionPage'
import PlayerEndPage from './PlayerEndPage'
import FormTextInput from '../../ui/form-items/FormTextInput'
import { FormButton, FullScreenForm } from '../../ui/Form'
import { GradientFullscreenDiv } from '../../ui'
import useHomeLogic from '../../custom-hooks/useHomeLogic'

const Home = props => {
    const playerName = useTextInput()
    const passcode = useTextInput()
    const {game, onSubmit, ownerStatus, roomId} = useHomeLogic(playerName, passcode)

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
            <GradientFullscreenDiv>
            <FullScreenForm onSubmit={onSubmit}>
                <FormTextInput label='Name' {...playerName} />
                <FormTextInput label='Passcode' {...passcode} />
                <FormButton type='submit'>Join</FormButton>
            </FullScreenForm>
            </GradientFullscreenDiv>
        </>
    }
}

export default Home