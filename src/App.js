import React from 'react';
import './App.css';
import useFirebaseAuth from './custom-hooks/useFirebaseAuth';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AuthRoute from './routes/AuthRoute';
import NonAuthRoute from './routes/NonAuthRout';
import DialogScreen from './ui/popup/DialogScreen';
import LoadingScreen from './ui/popup/LoadingScreen';


const App = props => {
  const { user } = useSelector(state => state.global)
  useFirebaseAuth()
  return (
    <BrowserRouter>
      <DialogScreen/>
      <LoadingScreen/>
      {user ? <AuthRoute /> : <NonAuthRoute />}
    </BrowserRouter>
  );
}
export default App;
