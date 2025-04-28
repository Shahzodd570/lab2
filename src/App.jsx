// src/App.jsx
import { useContext, useState, useEffect } from "react";
import { Container, Box, Paper, Button, Snackbar, Alert } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import About from "./components/About";
import Profile from "./components/Profile";
import { ThemeContext } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import useLoginState from "./hooks/useLoginState";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, clearError } from "./redux/userSlice";
import { fetchReviews } from "./redux/reviewSlice";

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const { isLoggedIn, login: loginUser, logout } = useLoginState();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.user.error);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [showRegister, setShowRegister] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchReviews());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleLogout = () => {
    logout();
    setSnackbarMessage("Вы успешно вышли из аккаунта");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    dispatch(clearError());
  };

  useEffect(() => {
    console.log("App.jsx: darkMode =", darkMode);
    console.log("App.jsx: isLoggedIn =", isLoggedIn);
    console.log("App.jsx: currentUser =", currentUser);
    console.log("App.jsx: showRegister =", showRegister);
  }, [darkMode, isLoggedIn, currentUser, showRegister]);

  if (!isLoggedIn) {
    console.log("App.jsx: Rendering form, showRegister =", showRegister);
    return (
      <Box
        sx={{
          backgroundColor: "white",
          color: "text.primary",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {showRegister ? (
          <RegisterForm
            onRegister={(userData) => {
              loginUser(userData);
              setSnackbarMessage("Регистрация успешна!");
              setSnackbarSeverity("success");
              setSnackbarOpen(true);
              setShowRegister(false);
            }}
          />
        ) : (
          <LoginForm
            onLogin={(data) => {
              loginUser(data);
              setSnackbarMessage("Вход выполнен успешно!");
              setSnackbarSeverity("success");
              setSnackbarOpen(true);
            }}
          />
        )}
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            onClick={() => setShowRegister(!showRegister)}
            color="primary"
          >
            {showRegister ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
          </Button>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  return (
    <BrowserRouter>
      <Box
        sx={{
          backgroundColor: "white",
          color: "text.primary",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header onLogout={handleLogout} />
        <Container sx={{ mt: 2, mb: 2, flexGrow: 1 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr", gap: 2 }}>
            <Paper sx={{ p: 2, backgroundColor: darkMode ? "#424242" : "#f5f5f5" }}>
              <Routes>
                <Route path="/" element={<Content />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/lab1" element={<Content selectedLabId={1} />} />
                <Route path="/lab2" element={<Content selectedLabId={2} />} />
                <Route path="/lab3" element={<Content selectedLabId={3} />} />
              </Routes>
            </Paper>
          </Box>
        </Container>
        <Footer />
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </BrowserRouter>
  );
};

export default App;