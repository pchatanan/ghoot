import React from 'react'
import styled from 'styled-components'

const ProgressBar = styled.div.attrs(props => {
  const { seconds, currentSecond } = props
  const percent = currentSecond * 100 / seconds
  return {
    style: {
      width: `${percent}%`
    }
  }
})`
  height: 100%;
  background red;
`

const TimeOut = ({ seconds, onTimeOut }) => {
  const [currentSecond, setCurrentSecond] = React.useState(seconds)
  React.useEffect(() => {
    var timeout = null
    if (currentSecond > 0) {
      timeout = setTimeout(() => {
        setCurrentSecond(preCurrentSecond => preCurrentSecond - 0.05)
      }, 50)
    }
    else {
      console.log('current second is zero')
      onTimeOut()
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [currentSecond, onTimeOut])
  if (currentSecond === 0) {
    return null
  }
  return <ProgressBar seconds={seconds} currentSecond={currentSecond}>
    {Math.round(currentSecond)}
  </ProgressBar>
}

export default TimeOut