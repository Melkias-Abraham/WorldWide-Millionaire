import { createContext, useState } from "react";
import axios from "axios";

export const authContext = createContext();

export default function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Perform login process for the user & save authID, etc


  

  const login = async function (user) {

    const res = await axios.post("/api/users/login", user);


    setAuth(true);
    if (!res.data.name) {
      return setAuth(false);
    }
    window.localStorage.setItem("user", res.data.name);
    setCurrentUser(res.data.name);
  };

  const logout = function () {
    window.localStorage.removeItem("user");
    setCurrentUser(null);
    setAuth(false);
  };


    const user = window.localStorage.user ? window.localStorage.user : null

  // authContext will expose these items
  const userData = { auth, currentUser, login, logout, user };

  // We can use this component to wrap any content we want to share this context
  return (
    <authContext.Provider value={userData}>
      {props.children}
    </authContext.Provider>
  );
}
