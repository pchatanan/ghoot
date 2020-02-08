import React from 'react'
import useTextInput from '../custom-hooks/useTextInput'
import firebase from 'firebase/app'
import 'firebase/auth'

const LoginPage = propr => {
  const email = useTextInput()
  const password = useTextInput()
  const [submit, setSubmit] = React.useState(false)
  return <div>
    <form onSubmit={e => {
      setSubmit(true)
      firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(userCredential => {
        })
        .catch(error => {
        })
      e.preventDefault()
    }}>
      <label>
        <div>Email</div>
        <input {...email} disabled={submit} />
      </label>
      <label>
        <div>Password</div>
        <input type='password' {...password} disabled={submit} />
      </label>
      <button type='submit' disabled={submit}>{submit ? 'Logging in ...' : 'Login'}</button>
    </form>
  </div>
}

export default LoginPage