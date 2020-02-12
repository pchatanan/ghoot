import React from 'react'
import { SubHeader, FullscreenDiv, Header } from '../../ui'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import useTopPlayers from '../../custom-hooks/useTopPlayers'

const ToggleButton = styled.div`
    position: fixed;
    background: white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    top: 0;
    right: 20px;
    padding: 10px;
    box-shadow: 0px 0px 6px 0px rgba(0,0,0,0.4);
    font-size: 1.4rem;
    z-index: 5;
    cursor: pointer;
`

const LeaderBroadPage = styled(FullscreenDiv)`
    background: #FFE93B;
    display: ${props => props.show ? 'block' : 'none'};
    z-index: 4;
`

const TopPlayerPage = props => {
    const [show, setShow] = React.useState(false)
    const { accountStatus } = useSelector(state => state.global)
    const topPlayers = useTopPlayers(accountStatus && accountStatus.roomId, 10)
    return <>
    <ToggleButton onClick={e => {setShow(preShow => !preShow)}}>
        {show ? 'Hide leader broad' : 'Show leader broad'}
    </ToggleButton>
    <LeaderBroadPage show={show}>
        <Header>Top Players</Header>
        {topPlayers.map((player, playerIndex) => {
            return <SubHeader key={playerIndex}>{`${player.name}: ${player.score}`}</SubHeader>
        })}
    </LeaderBroadPage>
    </>
}

export default TopPlayerPage