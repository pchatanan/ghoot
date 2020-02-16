import React from 'react'
import TimeOut from '../../components/TimeOut'
import firebase from 'firebase/app'
import 'firebase/firestore'
import styled from 'styled-components'
import { GradientFullscreenDiv, Header, CenterContainer, SubHeader } from '../../ui'
import { fs } from '../..'

const GridLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template:
    'countdown countdown'
    'option1 option2'
    'option3 option4';
  grid-template-rows: 1fr 6fr 6fr;
  grid-template-columns: 1fr 1fr;
`

const Countdown = styled.div`
  grid-area: countdown;
`

const Option1 = styled.div`
  background: #F25E3B;
  grid-area: option1;
  cursor: pointer;
`

const Option2 = styled.div`
  background: #3E83CB;
  grid-area: option2;
  cursor: pointer;
`

const Option3 = styled.div`
  background: #ECE649;
  grid-area: option3;
  cursor: pointer;
`

const Option4 = styled.div`
  background: #4DC98E;
  grid-area: option4;
  cursor: pointer;
`



const PlayerQuestionPage = ({ question, playerName, questionIndex, roomId }) => {
  const roomRef = fs.collection('rooms').doc(roomId)
  const answerRef = roomRef.collection(questionIndex.toString()).doc(playerName)
  const scoreRef = roomRef.collection('players').doc(playerName)
  const [waiting, setWaiting] = React.useState(false)
  const [score, setScore] = React.useState()
  const [allocatingDone, setAllocatingDone] = React.useState()
  const onTimeOut = React.useCallback(() => {
    setWaiting(true)
  }, [])

  React.useEffect(() => {
    setWaiting(false)
  }, [questionIndex])

  React.useEffect(() => {
    return scoreRef.onSnapshot(doc => {
      if(doc.exists){
        setScore(doc.data().score)
      }
    })
  }, [scoreRef])

  React.useEffect(() => {
    console.log('Listen to room change')
    return roomRef.onSnapshot(doc => {
      if(doc.exists){
        setAllocatingDone(doc.data().allocatingDone)
      }
    })
  }, [roomRef])

  if (waiting) {
    return <GradientFullscreenDiv>
      <CenterContainer>
        {allocatingDone && <Header>Your score: {score}</Header>}
        <SubHeader>{'waiting for the next question'}</SubHeader>
      </CenterContainer>
    </GradientFullscreenDiv>
  }
  else {
    return <GridLayout>
      <Countdown>
        <TimeOut seconds={8} onTimeOut={onTimeOut} />
      </Countdown>
      <Option1 onClick={e => {
        setWaiting(true)
        answerRef.set({
          player: playerName,
          answer: 0,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }}>
        {question.option1}
      </Option1>
      <Option2 onClick={e => {
        setWaiting(true)
        answerRef.set({
          player: playerName,
          answer: 1,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }}>
        {question.option2}
      </Option2>
      <Option3 onClick={e => {
        setWaiting(true)
        answerRef.set({
          player: playerName,
          answer: 2,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }}>
        {question.option3}
      </Option3>
      <Option4 onClick={e => {
        setWaiting(true)
        answerRef.set({
          player: playerName,
          answer: 3,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
      }}>
        {question.option4}
      </Option4>
    </GridLayout>
  }
}

export default PlayerQuestionPage