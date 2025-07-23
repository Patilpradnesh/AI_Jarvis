import React, { useState,useContext } from "react";
import bg from "../assets/back.jpg";
import { LuEyeClosed } from "react-icons/lu";
import { BsEyeFill } from "react-icons/bs";
import { Navigate, useNavigate } from "react-router-dom";
import { userDataContext } from "../contextApi/userContext";
import axios from "axios";
import UserContext from "../contextApi/userContext"

function  SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const Navigate = useNavigate();
  const { serverUrl } = useContext(userDataContext); 
  const [Loading,setLoading]=useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const[err,setErr]=useState("");

  // Api fetching for signup from axios library
  // we are using context api here
const handelSignIn =async(e)=>{
  e.preventDefault();  // it stope the event that happen default
  setErr("");
  setLoading(true);

  console.log("sending login request ",{email,serverUrl});
  try {
    let result =await axios.post(`${serverUrl}/api/auth/signIn`,{   
     email,password,
    },{withCredentials:true})  // withCredentials is used to pass the token in cookies ease

    console.log(result.data)
    if(result.status){
      alert("Sign In successful")
      Navigate("/")
    }
     setLoading(false)
  } catch (error) {
    setLoading(false)
   console.log("Full error response:", error.response);
  console.log("Error data:", error.response?.data);
  setErr(error.response?.data?.message || "Login failed");
  }
}

  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center item-center"
      style={{ backgroundImage: `url(${bg}` }}
    >
      <form onSubmit ={handelSignIn}   className="w-[90%] h-[600px] max-w-[500px] bg-[#00000008] backdrop-blur shadow-black-600 flex flex-col item -center justify-center gap-[20px]">
        <h1 className="text-white text-[30px] font semibold mb-[30px]">
          Login To <span className="text-cyan-300">Virtual Assistant</span>
        </h1>

        

        {/* email */}
        <label htmlFor="UserName" className="text-[white] ml-3">
          Email
        </label>
        <input
          type="email"
          name=""
          id=""
          placeholder="Enter Your Email-Id"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required onChange={(e)=>setEmail(e.target.value)} value={email}
        />

        {/* password */}
        <div className="w-full h-[60px] border-white bg-transparent text-white rounded-full text-[18px] relative">
          <label htmlFor="UserName" className="text-[white] ml-3">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name=""
            id=""
            placeholder="Enter Your valid Password"
            className="w-full h-full outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
            required onChange={(e)=>setPassword(e.target.value)} value={password}
          />
          {showPassword && (
            <BsEyeFill
              className="absolute top-[50px] right-[20px] text-[white] cursor-pointe "
              onClick={() => {
                setShowPassword(false);
              }}
            />
          )}
          
          {!showPassword && (
            <LuEyeClosed
              className="absolute top-[50px] right-[20px] text-[white] cursor-pointer "
              onClick={() => {
                setShowPassword(true);
              }}
            />
          )}
        </div>

          {/* error handling message  */}
          {err.length >0 &&
           <p className='text-red-500 flex justify-center mt-3 '>
            *{err}
            </p>
            }
            
        <div className='mt-8 flex justify-center text-[20px]'>
          <button className="min-w-[100px] h-[50px] bg-white rounded-full 2xl "disabled={Loading}>
           {Loading?"Loading...":"Sign up"}
          </button>
        </div>
        <p
          className="text-[white] text-[18px] cursor-pointer mb-5 flex justify-center"
          onClick={() => Navigate("/signup")}
        >
          Create An Account ?{" "}
          <span className="text-blue-400">Sign-up</span>
        </p>
      </form>
    </div>
  );
}


export default SignIn;