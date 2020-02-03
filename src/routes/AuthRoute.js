import React from 'react'
import AdminConsole from './AdminConsole'
import {Route} from 'react-router-dom'

const AuthRoute = props => {
    return <>
        <Route exact path='/admin' component={AdminConsole} />
    </>
}

export default AuthRoute