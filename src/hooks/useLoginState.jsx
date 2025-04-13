// src/hooks/useLoginState.jsx
import { useState, useEffect } from "react";

const useLoginState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log("Initial isLoggedIn from localStorage:", loggedIn);
    return loggedIn;
  });
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || null;
    console.log("Initial user from localStorage:", storedUser);
    return storedUser;
  });

  useEffect(() => {
    console.log("isLoggedIn updated:", isLoggedIn);
    console.log("user updated:", user);
  }, [isLoggedIn, user]);

  const login = (userData) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null); // Убедимся, что user сбрасывается
  };

  return { isLoggedIn, user, login, logout };
};

export default useLoginState;