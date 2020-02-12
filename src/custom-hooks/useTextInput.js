import React from 'react'

const useTextInput = () => {
  const [value, setValue] = React.useState('')
  const onChange = React.useCallback(e => {
    setValue(e.target.value)
  }, [setValue])
  const reset = React.useCallback(() => {
    setValue('')
  }, [setValue])
  return { value, onChange, reset }
}

export default useTextInput