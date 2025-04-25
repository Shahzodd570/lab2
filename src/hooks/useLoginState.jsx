// src/hooks/useLoginState.jsx
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/userSlice";

const useLoginState = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogin = (userData) => {
    dispatch(login(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isLoggedIn: !!currentUser,
    user: currentUser,
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useLoginState;