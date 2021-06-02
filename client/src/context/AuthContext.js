import React, { useContext, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(
    emailRef,
    firstNameRef,
    lastNameRef,
    phoneRef,
    passwordRef,
    passwordConfirmRef
  ) {
    //console.log(emailRef);
    return axios
      .post("http://localhost:2000/signup", {
        firstName: firstNameRef,
        lastName: lastNameRef,
        email: emailRef,
        phone: phoneRef,
        password: passwordRef,
      })
      .then((response) => {
        if (response.data.message) {
          //setResponse(response.data.message);
        } else {
          //setResponse("Registration was successfull");
          let res = response.data;
          return res;
        }
      });

    //console.log(passwordRef);
  }

  const value = {
    currentUser,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
