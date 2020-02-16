import React from 'react'
import useTextInput from '../custom-hooks/useTextInput'
import firebase from 'firebase/app'
import 'firebase/auth'
import {GradientFullscreenDiv} from '../ui'
import {FullScreenForm, FormButton} from '../ui/Form'
import FormTextInput from '../ui/form-items/FormTextInput'
import {useDispatch} from 'react-redux'
import { setDialogScreen } from '../redux/actions'

const LoginPage = propr => {
  const dispatch = useDispatch()
  const email = useTextInput()
  const password = useTextInput()
  const [submit, setSubmit] = React.useState(false)
  return <GradientFullscreenDiv>
    <FullScreenForm onSubmit={e => {
      setSubmit(true)
      firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(userCredential => {
        })
        .catch(error => {
          dispatch(setDialogScreen(error.message, () => {
            setSubmit(false)
          }))
        })
      e.preventDefault()
    }}>
      <FormTextInput label='Email' {...email} disabled={submit}/>
      <FormTextInput label='Password' {...password} disabled={submit} type='password'/>
      <FormButton type='submit' disabled={submit}>{submit ? 'Logging in ...' : 'Login'}</FormButton>
    </FullScreenForm>
    </GradientFullscreenDiv>
}

export default LoginPage