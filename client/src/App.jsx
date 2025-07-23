import React from 'react';
import { Routes ,Route} from 'react-router-dom';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/signUp' element={<SignUp/>}/>
      <Route path='/signIn' element={<SignIn/>}/>
    </Routes>
    
  )
}

export default App;