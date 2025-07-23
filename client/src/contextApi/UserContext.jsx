import React from "react";
import { createContext, Provider } from "react";

export const userDataContext = createContext(); //this context is send every where
function UserContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const Value = {
    serverUrl, // this serverUrl is placed here just coz we want to end this serverUrl to other place with help of value attribute object
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
