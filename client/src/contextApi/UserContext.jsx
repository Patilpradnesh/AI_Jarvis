import React, { useEffect } from "react";
import { createContext, Provider } from "react";
import { useState } from "react";
import axios from "axios";

export const userDataContext = createContext(); //this context is send every where


function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData,setUserData]= useState(null);

  const handleCurrentUser =async () =>{
    try {
      const result = await axios.get(`${serverUrl}/api/user/currentUser`,{withCredentials:true});

      setUserData(result.data);
      console.log("Current user data:", result.data);
      
    } catch (error) {
      console.error("Error fetching current user:", error);
      
    }
  }
 useEffect(()=>{
   handleCurrentUser ();
 },[])

  const Value = {
    serverUrl, // this serverUrl is placed here just coz we want to end this serverUrl to other place with help of value attribute object
    userData, // this userData is placed here just coz we want to end this userData to other place with help of value attribute object
    setUserData, // this setUserData is placed here just coz we want to end this setUserData to other place with help of value attribute object
  
  };
  return (
    <userDataContext.Provider value={Value}>
      {" "}
      {/* children is rapped here by this context  */}
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
