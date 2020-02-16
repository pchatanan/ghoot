import React from 'react'
import AdminConsole from './AdminConsole'
import { Route, withRouter } from 'react-router-dom'
import 'firebase/auth'
import 'firebase/firestore'
import CreateGamePage from './CreateGamePage'
import useAccountStatus from '../custom-hooks/useAccountStatus'
import { useSelector, useDispatch } from 'react-redux'
import HosterLobbyPage from './hoster/HosterLobbyPage'
import HosterQuestionPage from './hoster/HosterQuestionPage'
import useGame from '../custom-hooks/useGame'
import useTopPlayers from '../custom-hooks/useTopPlayers'
import HosterEndPage from './hoster/HosterEndPage'
import Menu from '../components/Menu'
import { MenuContainer, ContentContainer } from '../ui'
import TopPlayerPage from './hoster/TopPlayerPage'
import { setLoadingScreen, dismissLoadingScreen } from '../redux/actions'

const AuthRoute = props => {
    const { accountStatus, statusLoading, loadingScreen } = useSelector(state => state.global)
    const dispatch = useDispatch()
    const game = useGame(accountStatus.gameId)
    const topPlayers = useTopPlayers(accountStatus && accountStatus.roomId, 10)
    console.log(topPlayers)
    useAccountStatus()

    if (statusLoading) {
        return <></>
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
        if(!loadingScreen.show){
            dispatch(setLoadingScreen('creating room'))
        }
        return <></>
    }
    if (accountStatus.status === 'lobby') {
        if(loadingScreen.show) dispatch(dismissLoadingScreen())
        return <HosterLobbyPage />
    }
    if (accountStatus.status === 'question') {
        console.log(game)
        if (!game) {
            return <div>Loading game...</div>
        }
        else {
            return <div>
                <TopPlayerPage/>
                <HosterQuestionPage question={game.questions[accountStatus.question]} totalQuestion={game.questions.length} />
            </div>
        }

    }
    else if (accountStatus.status === 'end') {
        return <HosterEndPage topPlayers={topPlayers} />
    }

}

export default withRouter(AuthRoute)