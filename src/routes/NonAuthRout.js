import React from 'react'
import Home from './Home'
import { Route, Switch } from 'react-router-dom'
import LoginPage from './LoginPage'

const NonAuthRoute = props => {
    return <Switch>
        <Route exact path='/admin' component={LoginPage} />
        <Route component={Home} />
    </Switch>
}

export default NonAuthRoute