import { createContext, useState, useEffect } from "react";

const LoginContext = createContext({});

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const login = localStorage.getItem("isLogin");

    if (login) {
      setIsLogin(JSON.parse(login));
    }
  }, [isLogin]);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, error, setError }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
