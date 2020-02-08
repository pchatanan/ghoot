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
  height: 100vh;
  weight: 100vw;
`

export const CenterContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`