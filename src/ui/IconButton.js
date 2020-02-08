import React from 'react'
import styled from 'styled-components'

const IconButtonContainer = styled.button`
  height: 40px;
  width: fit-content;
  minWidth: 40px;
  border-radius: 20px;
  border: none;
  outline: none;
  padding: 10px;
  margin: 5px;
  cursor: pointer;
  background: #FFE93B;
  :hover {
    background: #b2a329;
  }
`

const IconContainer = styled.div`
  width: 20px;
  height: 20px;
`

const IconButton = ({ Icon, ...otherProps }) => {
  return <IconButtonContainer {...otherProps}>
    <IconContainer>
      <Icon fill='black' />
    </IconContainer>
  </IconButtonContainer>
}

export default IconButton