import { createContext, useState } from "react";

// export const AuthContext = createContext({
//   // isLoggedIn: false,
//   // userId: null,
//   // token: null,
//   // login: () => {},
//   // logout: () => {},
//   user: 'John'
// });

const authContext = createContext()

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    username: '',
    isLoggedIn: false,
    token: null,
    userId: null
  });

  const [token, setToken] = useState()
  const [userId, setUserId] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [username, setUsername] = useState()

  // Define functions to update the state
  const incrementCounter = () => {
    setState(prevState => ({
      ...prevState,
      counter: prevState.counter + 1,
    }));
  };

  const setUser = (user) => {
    console.log(user)
    setState({
      user:user
    })
  }

  const login = (token, uid, username, expirationDate) => {
    setToken(token)
    setUserId(uid)
    setUsername(username)

    localStorage.setItem("userData", JSON.stringify({
      userId: uid,
      username: username,
      token: token,    

    }))
  }

  const logout = () => {
    setToken(null)
    setUserId(null)
    setIsLoggedIn(false)
    setUsername('')

    localStorage.removeItem("userData")
  }



  // Pass the state and functions through the context
  return (
    <authContext.Provider value={{ state, login, setIsLoggedIn, isLoggedIn, username, logout, userId }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;