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
    var timer = setInterval(() => {
      setCurrentSecond(preCurrentSecond => {
        if (preCurrentSecond < 0) {
          clearTimeout(timer)
          console.log('current second is zero')
          onTimeOut()
          return 0
        }
        return preCurrentSecond - 0.01
      })

    }, 10)
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [onTimeOut])
  if (currentSecond === 0) {
    return null
  }
  return <ProgressBar seconds={seconds} currentSecond={currentSecond}>
    {Math.round(currentSecond)}
  </ProgressBar>
}

export default TimeOut