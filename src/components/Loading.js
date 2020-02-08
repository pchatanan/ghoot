import React from 'react'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
`

const animation = keyframes`
  0% {
    top: 6px;
    height: 51px;
  }
  50%, 100% {
    top: 19px;
    height: 26px;
  }
`

const Div = styled.div`
  display: inline-block;
  position: absolute;
  left: 6px;
  width: 13px;
  background: black;
  animation: ${animation} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
`

const Div1 = styled(Div)`
  left: 6px;
  animation-delay: -0.24s;
`

const Div2 = styled(Div)`
  left: 26px;
  animation-delay: -0.12s;
`

const Div3 = styled(Div)`
  left: 45px;
  animation-delay: 0;
`

const Loading = props => {
  return <Container><Div1></Div1><Div2></Div2><Div3></Div3></Container>
}

export default Loading