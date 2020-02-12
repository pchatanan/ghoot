import React from 'react'
import PopUpScreen from '.'
import {useSelector, useDispatch} from 'react-redux'
import { dismissDialogScreen } from '../../redux/actions'


const DialogScreen = props => {
    const {dialogScreen} = useSelector(state => state.global)
    const dispatch = useDispatch()
    console.log(dialogScreen)
    return <PopUpScreen show={dialogScreen.show} text={dialogScreen.text} render={() => {
        return <>
        <p>{dialogScreen.text}</p>
        <button onClick={() => {
            dispatch(dismissDialogScreen())
        }}>dismiss</button>
        </>
    }}/>
}

export default DialogScreen