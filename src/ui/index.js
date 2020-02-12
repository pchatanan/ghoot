import styled from 'styled-components'

export const Header = styled.div`
  font-family: PSL;
  font-size: 3rem;
  text-align: center;
`

export const SubHeader = styled.div`
  font-family: PSL;
  font-size: 2rem;
  text-align: center;
`

export const MenuContainer = styled.div`
  width: 100vw;
  background: black;
  color: yellow;
  font-family: PSL;
  height: 60px;
  position: fixed;
  top: 0;
`

export const ContentContainer = styled.div`
  background: lightgrey;
  position: fixed;
  top: 60px;
  bottom: 0;
  width: 100vw;
  overflow: auto;
`

export const FullscreenDiv = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
`

export const GradientFullscreenDiv = styled(FullscreenDiv)`
  background: linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(109,98,46,1) 34%, rgba(255,233,59,1) 100%);
`

export const CenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`

