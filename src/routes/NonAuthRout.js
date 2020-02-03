import React from 'react'
import Home from './Home'
import {Route} from 'react-router-dom'

const NonAuthRoute = props => {
    return <>
        <Route component={Home} />
    </>
}

export default NonAuthRoute