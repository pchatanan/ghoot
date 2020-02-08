import React from 'react'
import Home from './Home'
import { Route } from 'react-router-dom'
import LoginPage from './LoginPage'

const NonAuthRoute = props => {
    return <>
        <Route exact path='/admin' component={LoginPage} />
        <Route component={Home} />
    </>
}

export default NonAuthRoute