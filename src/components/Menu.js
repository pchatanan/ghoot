import React from 'react'
import { withRouter, Route } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import IconButton from '../ui/IconButton'
import LogoutIcon from '../ui/icons/LogoutIcon'
import HomeIcon from '../ui/icons/HomeIcon'
import AddIcon from '../ui/icons/AddIcon'
import styled from 'styled-components'


const HomeButton = withRouter(props => {
  return <IconButton Icon={HomeIcon} onClick={e => {
    props.history.push('/admin')
  }} />
})

const LogoutButton = (props) => {
  return <IconButton Icon={LogoutIcon} onClick={e => {
    firebase.auth().signOut()
      .then(() => {
        console.log('logout successfully')
      })
      .catch(error => {
        console.log(error.message)
      })
  }} />
}

const CreateButton = withRouter(props => {
  return <IconButton Icon={AddIcon} onClick={e => {
    props.history.push('/admin/create_game')
  }} />
})

const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  margin-left: 10px;
  transform: translate(0,-50%);
`

const AdminMenu = props => {
  return <ButtonContainer>
    <CreateButton />
    <LogoutButton />
  </ButtonContainer>
}

const CreateMenu = props => {
  return <ButtonContainer>
    <HomeButton />
    <LogoutButton />
  </ButtonContainer>
}

const Menu = props => {
  return <>
    <Route exact path='/admin' component={AdminMenu} />
    <Route component={CreateMenu} />
  </>
}

export default withRouter(Menu)