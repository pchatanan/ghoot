import React from 'react';
import logo from './logo.svg';
import './App.css';
import useFirebaseAuth from './custom-hooks/useFirebaseAuth'
import {useSelector} from 'react-redux'
import {BrowserRouter, Route} from 'react-router-dom'
import AuthRoute from './routes/AuthRoute';
import NonAuthRoute from './routes/NonAuthRout';


const App = props => {
  const { authLoading, user } = useSelector(state => state.global)
  useFirebaseAuth()
  if(authLoading) return <div>Loading...</div>
  return (
    <BrowserRouter>
      {user ? <AuthRoute/> : <NonAuthRoute/>}
    </BrowserRouter>
  );
}
export default App;
