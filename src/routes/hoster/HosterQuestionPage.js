import React from 'react'
import TimeOut from '../../components/TimeOut'
import firebase from 'firebase/app'
import 'firebase/functions'
import 'firebase/firestore'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { SubHeader, CenterContainer } from '../../ui'
import Button from '../../ui/Button'

const GridLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  position: fixed;
  grid-template:
    'countdown countdown'
    'question question'
    'option1 option2'
    'option3 option4';
  grid-template-rows: 1fr 2fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
`

const CountdownDiv = styled.div`
  grid-area: countdown;
`

const QuestionDiv = styled.div`
  grid-area: question;
  position: relative;
`

const getColor = (baseColor, isAnswer, showAns) => {
  if(showAns){
    return isAnswer ? 'LightGreen' : 'LightSalmon'
  }
  else{
    return baseColor
  }
}

const Option1 = styled.div`
  background: ${props => getColor('#F25E3B', props.isAnswer, props.showAns)};
  grid-area: option1;
  position: relative;
`

const Option2 = styled.div`
  background: ${props => getColor('#3E83CB', props.isAnswer, props.showAns)};
  grid-area: option2;
  position: relative;
`

const Option3 = styled.div`
  background: ${props => getColor('#ECE649', props.isAnswer, props.showAns)};
  grid-area: option3;
  position: relative;
`

const Option4 = styled.div`
  background: ${props => getColor('#4DC98E', props.isAnswer, props.showAns)};
  grid-area: option4;
  position: relative;
`

const HosterQuestionPage = ({ question, totalQuestion }) => {
  const [showAns, setShowAns] = React.useState(false)
  const [showNext, setShowNext] = React.useState(false)
  const { accountStatus, user } = useSelector(state => state.global)

  const isLastQuestion = React.useMemo(() => {
    return totalQuestion === accountStatus.question + 1
  }, [totalQuestion, accountStatus.question])



  const onNextClick = React.useCallback(e => {
    setShowNext(false)
    setShowAns(false)
    const fs = firebase.firestore()
    var hosterRef = fs.collection('users').doc(user.uid)
    var roomRef = fs.collection('rooms').doc(accountStatus.roomId)
    if (totalQuestion > accountStatus.question + 1) {
      var batch = fs.batch()
      batch.update(hosterRef, {
        question: firebase.firestore.FieldValue.increment(1)
      })
      batch.update(roomRef, {
        allocatingDone: false
      })
      batch.commit()
    }
  }, [accountStatus.question, accountStatus.roomId, totalQuestion, user.uid])

  const onEndClick = React.useCallback(e => {
    setShowNext(false)
    const fs = firebase.firestore()
    var batch = fs.batch()
    var hosterRef = fs.collection('users').doc(user.uid)
    batch.update(hosterRef, {
      status: 'end',
      question: 0
    })
    var roomRef = fs.collection('rooms').doc(accountStatus.roomId)
    batch.update(roomRef, {
      status: 'ended'
    })
    batch.commit().then(() => {
      console.log('Game ended')
    })

  }, [accountStatus.roomId, user.uid])



  React.useEffect(() => {
    setShowNext(false)
  }, [question])

  console.log('new timeout created')

  const onTimeOut = React.useCallback(() => {
    console.log('onTimeout')
    setShowAns(true)
    var allocateScore = firebase.functions().httpsCallable('allocateScore');
    allocateScore({
      roomId: accountStatus.roomId,
      questionIndex: accountStatus.question,
      answer: question.answer
    }).then((result) => {
      console.log('done allocating score')
      setShowNext(true)
    });
  }, [accountStatus.roomId, accountStatus.question, question.answer])

  return <GridLayout>
    <CountdownDiv>
    {!showNext && <TimeOut seconds={10} onTimeOut={onTimeOut} />}
    {showNext && <Button onClick={isLastQuestion ? onEndClick : onNextClick}>{isLastQuestion ? 'End game' : 'Next'}</Button>}
    </CountdownDiv>
    <QuestionDiv>
      <CenterContainer>
      <SubHeader>
        {question.text}
      </SubHeader>
      </CenterContainer>
    </QuestionDiv>
    <Option1 isAnswer={question.answer === 0} showAns={showAns}>
      <CenterContainer>
        <SubHeader>
        {question.option1}
        </SubHeader>
      </CenterContainer>
    </Option1>
    <Option2 isAnswer={question.answer === 1} showAns={showAns}>
      <CenterContainer>
        <SubHeader>
        {question.option2}
        </SubHeader>
      </CenterContainer>
    </Option2>
    <Option3 isAnswer={question.answer === 2} showAns={showAns}>
      <CenterContainer>
        <SubHeader>
        {question.option3}
        </SubHeader>
      </CenterContainer>
    </Option3>
    <Option4 isAnswer={question.answer === 3} showAns={showAns}>
      <CenterContainer>
        <SubHeader>
        {question.option4}
        </SubHeader>
      </CenterContainer>
    </Option4>
    
  </GridLayout>
}

export default HosterQuestionPage