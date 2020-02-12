import React from 'react'
import styled, {keyframes} from 'styled-components'

const shrink = keyframes`
  from {
    width: 100%;
    background: LightGreen;
  }
  to {
    width: 0%;
    background: LightSalmon;
  }
`

const ProgressBar = styled.div`
  height: 100%;
  animation: ${shrink} ${props => `${props.seconds}s`} linear;
`

const TimeOut = ({ seconds, onTimeOut }) => {
  React.useEffect(() => {
    var timer = setTimeout(() => {
      console.log('current second is zero')
      onTimeOut()
    }, seconds*1000)
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [onTimeOut, seconds])
  return <ProgressBar seconds={seconds} />
}

export default TimeOut