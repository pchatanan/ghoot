import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setAccountStatus, setLoadingScreen, dismissLoadingScreen } from '../redux/actions'
import { fs } from '..'

const useAccountStatus = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.global)
  React.useEffect(() => {
    console.log('useAccountStatus')
    dispatch(setLoadingScreen('loading your data'))
    fs.collection('users').doc(user.uid).onSnapshot(doc => {
      if (doc.exists) {
        dispatch(setAccountStatus(doc.data()))
      }
      dispatch(dismissLoadingScreen())
    })
  }, [dispatch, user.uid])
}

export default useAccountStatus