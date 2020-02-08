import React from 'react'
import _ from 'lodash/lang'

const useArray = () => {
  const [values, setValues] = React.useState([])

  var clonedValues = React.useMemo(() => _.cloneDeep(values), [values])

  const pushItem = React.useCallback((item) => {
    clonedValues.push(item)
    setValues(clonedValues)
  }, [setValues, clonedValues])

  const removeItem = React.useCallback((index) => {
    clonedValues.splice(index, 1);
    setValues(clonedValues)
  }, [setValues, clonedValues])

  const updateItem = React.useCallback((newValue, index) => {
    clonedValues[index] = newValue
    setValues(clonedValues)
  }, [setValues, clonedValues])

  return { values, pushItem, removeItem, updateItem }
}

export default useArray