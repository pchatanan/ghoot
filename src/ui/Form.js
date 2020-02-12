import styled from 'styled-components'
import Button from './Button'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const FullScreenForm = styled(Form)`
  width: 100vw;
  height: 100vh;
`

export const FormLabel = styled.label`
  margin: 5px;
  display: flex;
  flex-direction: column;
`

export const FormButton = styled(Button)`
    font-size: 2rem;
    margin: 5px;
`