import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ role: "", username: "", id: "", id_empresa_logistica: "" });

  const login = (role, username, id, id_empresa_logistica) => {
    console.log("Setting user context:", { role, username, id, id_empresa_logistica });
    setUser({ role, username, id, id_empresa_logistica });
  };

  const logout = () => {
    setUser({ role: "", username: "", id: "", id_empresa_logistica: "" });
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
