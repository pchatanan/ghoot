import React from 'react'
import styled from 'styled-components'

const TransparentScreen = styled.div`
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100vw;
    height: 100vh;
    z-index: 10;
    backdrop-filter: blur(16px);
    display: ${props => props.show ? 'block' : 'none'};
`

const DialogContainer = styled.div`
    position: absolute;
    background: white;
    padding: 20px;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`

const PopUpScreen = ({render, ...otherProps}) => {
    return <TransparentScreen {...otherProps}>
        <DialogContainer>
            {render()}
        </DialogContainer>
    </TransparentScreen>
}

export default PopUpScreen