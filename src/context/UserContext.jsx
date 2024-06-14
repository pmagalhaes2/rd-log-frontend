import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: "",
    username: "",
    id: ""
  });

  const login = (role, username, id) => {
    setUser({ role, username, id });
  };

  const logout = () => {
    setUser({ role: "", username: "", id: "" });
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
