// src/hooks/useLoginState.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/userSlice";

const useLoginState = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  // Восстанавливаем пользователя из localStorage при загрузке
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser && !currentUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatch(login(parsedUser));
    }
  }, [dispatch, currentUser]);

  const handleLogin = (userData) => {
    dispatch(login(userData));
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("currentUser");
  };

  return {
    isLoggedIn: !!currentUser,
    user: currentUser,
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useLoginState;