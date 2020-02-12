import React from 'react'
import Input from '../Input'
import {FormLabel} from '../Form'
import { SubHeader } from '..'

const FormTextInput = ({label, ...otherProps}) => {
    return <FormLabel>
        <SubHeader>{label}</SubHeader>
        <Input {...otherProps}/>
    </FormLabel>
}

export default FormTextInput