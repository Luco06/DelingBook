import React, { createContext, useState } from "react";

export const AuthProvider = createContext();
const AuthContext = ({ children }) => {
  const [isLoging, setIsLoging] = useState(false);

  return (
    <AuthProvider.Provider value={{ isLoging, setIsLoging }}>
      {children}
    </AuthProvider.Provider>
  );
};

export default AuthContext;
