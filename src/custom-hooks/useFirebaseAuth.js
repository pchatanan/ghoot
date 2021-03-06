import React from 'react'
import {useDispatch} from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import { setUser, dismissLoadingScreen } from '../redux/actions'

const useFirebaseAuth = () => {
  const dispatch = useDispatch()
  const authStateChangedHandler = React.useCallback(user => {
    dispatch(setUser(user))
    if(!user){
      dispatch(dismissLoadingScreen())
    }
  }, [dispatch])
  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(authStateChangedHandler)
  }, [authStateChangedHandler])
}

export default useFirebaseAuth