import React from 'react'
import {useSelector} from 'react-redux'
import LoadingPage from '../../components/LoadingPage'


const LoadingScreen = props => {
    const {loadingScreen} = useSelector(state => state.global)
    return <LoadingPage show={loadingScreen.show} text={loadingScreen.text} />
}

export default LoadingScreen