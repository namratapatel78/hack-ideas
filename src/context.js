import React, { useEffect, useState } from "react";

const Context = React.createContext({
  isLoggedIn: false,
  setUserLoggedIn: () => {},
});

export const ContextProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("employeeId")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        isLoggedIn: isLoggedIn,
        setUserLoggedIn: setLoggedIn,
      }}>
      {props.children}
    </Context.Provider>
  );
};

export default Context;
