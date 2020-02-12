import React from 'react'
import useArray from '../custom-hooks/useArray'
import _ from 'lodash/lang'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { useSelector } from 'react-redux'
import useTextInput from '../custom-hooks/useTextInput'
import { Header } from '../ui'
import Button from '../ui/Button'

const CreateGamePage = props => {
  const questions = useArray()
  const gameName = useTextInput()
  const { user } = useSelector(state => state.global)
  const [submit, setSubmit] = React.useState(false)
  return <div>
    <Header>Create Game</Header>
    <Button onClick={e => {
      questions.pushItem({
        text: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: 0
      })
    }}>Add Question</Button>
    <Button onClick={e => {
      setSubmit(true)
      firebase.firestore().collection('users').doc(user.uid).collection('games').add({
        name: gameName.value,
        questions: questions.values
      })
        .then(() => {
          console.log('Game uploaded')
          props.history.push('/admin')
        })
    }}>{submit ? 'Uploading...' : 'Upload'}</Button>
    <div>
      <label>
        <div>Game Name</div>
        <input {...gameName} />
      </label>
    </div>
    {questions.values.map((question, questionIndex) => {
      return <div key={questionIndex}>
        <h5>{`Question ${questionIndex + 1}`}</h5>
        <label>
          <div>Question</div>
          <input value={question.text} onChange={e => {
            var newQuestion = _.cloneDeep(question)
            newQuestion.text = e.target.value
            questions.updateItem(newQuestion, questionIndex)
          }} />
        </label>
        <label>
          <div>Option 1</div>
          <input value={question.option1} onChange={e => {
            var newQuestion = _.cloneDeep(question)
            newQuestion.option1 = e.target.value
            questions.updateItem(newQuestion, questionIndex)
          }} />
        </label>
        <label>
          <div>Option 2</div>
          <input value={question.option2} onChange={e => {
            var newQuestion = _.cloneDeep(question)
            newQuestion.option2 = e.target.value
            questions.updateItem(newQuestion, questionIndex)
          }} />
        </label>
        <label>
          <div>Option 3</div>
          <input value={question.option3} onChange={e => {
            var newQuestion = _.cloneDeep(question)
            newQuestion.option3 = e.target.value
            questions.updateItem(newQuestion, questionIndex)
          }} />
        </label>
        <label>
          <div>Option 4</div>
          <input value={question.option4} onChange={e => {
            var newQuestion = _.cloneDeep(question)
            newQuestion.option4 = e.target.value
            questions.updateItem(newQuestion, questionIndex)
          }} />
        </label>
        <label>
          <div>Answer</div>
          <select value={question.answer} onChange={e => {
            var newQuestion = _.cloneDeep(question)
            newQuestion.answer = parseInt(e.target.value)
            questions.updateItem(newQuestion, questionIndex)
          }}>
            <option value={0}>Option 1</option>
            <option value={1}>Option 2</option>
            <option value={2}>Option 3</option>
            <option value={3}>Option 4</option>
          </select>
        </label>
        <div>
          <button onClick={e => {
            questions.removeItem(questionIndex)
          }}>Remove this questtion</button>
        </div>
      </div>
    })}
  </div>
}

export default CreateGamePage