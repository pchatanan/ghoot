import React from 'react'
import AdminConsole from './AdminConsole'
import { Route, withRouter } from 'react-router-dom'
import 'firebase/auth'
import 'firebase/firestore'
import CreateGamePage from './CreateGamePage'
import useAccountStatus from '../custom-hooks/useAccountStatus'
import { useSelector } from 'react-redux'
import HosterLobbyPage from './hoster/HosterLobbyPage'
import HosterQuestionPage from './hoster/HosterQuestionPage'
import useGame from '../custom-hooks/useGame'
import useTopPlayers from '../custom-hooks/useTopPlayers'
import HosterEndPage from './hoster/HosterEndPage'
import Menu from '../components/Menu'
import { MenuContainer, ContentContainer } from '../ui'
import LoadingPage from '../components/LoadingPage'

const AuthRoute = props => {
    const { accountStatus, statusLoading } = useSelector(state => state.global)
    const game = useGame(accountStatus.gameId)
    const topPlayers = useTopPlayers(accountStatus && accountStatus.roomId, 10)
    console.log(topPlayers)
    useAccountStatus()

    if (statusLoading) {
        return <LoadingPage text='loading user status' />
    }
    if (accountStatus.status === null || accountStatus.status === 'idle') {
        return <>
            <MenuContainer>
                <Menu />
            </MenuContainer>
            <ContentContainer>
                <Route exact path='/admin' component={AdminConsole} />
                <Route exact path='/admin/create_game' component={CreateGamePage} />
            </ContentContainer>
        </>
    }
    if (accountStatus.status === 'create_room') {
        return <LoadingPage text='creating room' />
    }
    if (accountStatus.status === 'lobby') {
        return <HosterLobbyPage />
    }
    if (accountStatus.status === 'question') {
        console.log(game)
        if (!game) {
            return <div>Loading game...</div>
        }
        else {
            return <div>
                <ul>
                    {topPlayers.map((player, playerIndex) => {
                        return <li key={playerIndex}>{`${player.name}: ${player.score}`}</li>
                    })}
                </ul>
                <HosterQuestionPage question={game.questions[accountStatus.question]} totalQuestion={game.questions.length} />
            </div>
        }

    }
    else if (accountStatus.status === 'end') {
        return <HosterEndPage topPlayers={topPlayers} />
    }

}

export default withRouter(AuthRoute)