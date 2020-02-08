import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setAccountStatus } from '../redux/actions'

const useAccountStatus = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.global)
  React.useEffect(() => {
    console.log('useAccountStatus')
    firebase.firestore().collection('users').doc(user.uid).onSnapshot(doc => {
      if (doc.exists) {
        dispatch(setAccountStatus(doc.data()))
      }
    })
  }, [dispatch, user.uid])
}

export default useAccountStatus