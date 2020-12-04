import React, { useState, createContext } from "react";

type Props = {
  state: any;
  setState: any;
  resetState: any;
};

const Context = createContext<Partial<Props>>({});
const ContextProvider = ({ children }) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    token: "",
    userId: 0,
    profilePictureUrl: "",
  });
  const resetState = () => {
    setState({
      ...state,
      password: "",
    });
  };
  return (
    <Context.Provider value={{ state, setState, resetState }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
