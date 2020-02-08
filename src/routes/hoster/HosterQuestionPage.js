import React from 'react'
import TimeOut from '../../components/TimeOut'
import firebase from 'firebase/app'
import 'firebase/functions'
import 'firebase/firestore'
import { useSelector } from 'react-redux'

const HosterQuestionPage = ({ question, totalQuestion }) => {

  const [showNext, setShowNext] = React.useState(false)
  const { accountStatus, user } = useSelector(state => state.global)

  const isLastQuestion = React.useMemo(() => {
    return totalQuestion === accountStatus.question + 1
  }, [totalQuestion, accountStatus.question])



  const onNextClick = React.useCallback(e => {
    setShowNext(false)
    const fs = firebase.firestore()
    var hosterRef = fs.collection('users').doc(user.uid)
    if (totalQuestion > accountStatus.question + 1) {
      hosterRef.update({
        question: firebase.firestore.FieldValue.increment(1)
      })
    }
  }, [accountStatus.question, totalQuestion, user.uid])

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
  return <div>
    <div>{question.text}</div>
    {!showNext && <TimeOut seconds={10} onTimeOut={onTimeOut} />}
    {showNext && <button onClick={isLastQuestion ? onEndClick : onNextClick}>{isLastQuestion ? 'End game' : 'Next'}</button>}
  </div>
}

export default HosterQuestionPage