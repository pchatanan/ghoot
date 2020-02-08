import React from 'react';
import './App.css';
import useFirebaseAuth from './custom-hooks/useFirebaseAuth'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import AuthRoute from './routes/AuthRoute';
import NonAuthRoute from './routes/NonAuthRout';
import LoadingPage from './components/LoadingPage';


const App = props => {
  const { authLoading, user } = useSelector(state => state.global)
  useFirebaseAuth()
  if (authLoading) return <LoadingPage text={'authenticating'} />
  return (
    <BrowserRouter>
      {user ? <AuthRoute /> : <NonAuthRoute />}
    </BrowserRouter>
  );
}
export default App;
