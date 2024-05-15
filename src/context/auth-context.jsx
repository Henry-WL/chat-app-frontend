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
    // Define your initial state here
    user: 'john',
    // You can add more state variables here
  });

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

  // Pass the state and functions through the context
  return (
    <authContext.Provider value={{ state, setUser }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;