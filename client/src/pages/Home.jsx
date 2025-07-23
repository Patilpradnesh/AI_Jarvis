import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
const navigate = useNavigate();  // this is hook used in React Router  v6 for navigation

const handelClick=()=>{
    navigate('/signup'); // changes the route programmatically
    navigate('/signIn')
}
  return (
   <>
   <h1>hii
   </h1>
   <button onClick={handelClick}>signUp</button>
   <br />
   <button onClick={handelClick}>signIn</button>
   </>
  )
}

export default Home