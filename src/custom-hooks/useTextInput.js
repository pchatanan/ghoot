import React from 'react'

const useTextInput = () => {
  const [value, setValue] = React.useState('')
  const onChange = React.useCallback(e => {
    setValue(e.target.value)
  }, [setValue])
  return { value, onChange }
}

export default useTextInput