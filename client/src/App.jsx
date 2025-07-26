import React, { useContext } from 'react';
import { Routes ,Route} from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Customize  from "./pages/Customize";
import {UserDataContext }from './contextApi/UserContext';
import { Navigate } from 'react-router-dom';

function App() {
  const {userData,setUserData}=useContext(UserDataContext);
  return (
    
    <Routes>
      <Route path="/" element={(userData?.assistantImage && userData?.assistantName)?<Home/>: <Navigate to="/Customize"/>}/>
      <Route path='/signUp' element={(!userData)?<SignUp/>:<Navigate to="/"/>}/>
      <Route path='/signIn' element={ (!userData)?<SignIn/>:<Navigate to="/"/>}/>
      <Route path='/Customize' element={(userData)?<Customize/>:<Navigate to ="/signIn"/>}/>
    </Routes>
    
  )
}

export default App;