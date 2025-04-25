// src/App.jsx
import { useContext, useState, useEffect } from "react"; // useEffect уже импортирован
import { Container, Box, Paper, Button, Snackbar, Alert } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Content from "./components/Content";
import { ThemeContext } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import useLoginState from "./hooks/useLoginState";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./redux/userSlice";

const App = () => {
  const { darkMode } = useContext(ThemeContext);
  const { isLoggedIn, login, logout } = useLoginState();
  const dispatch = useDispatch();
  const [showRegister, setShowRegister] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleLogout = () => {
    logout();
    setSnackbarMessage("Вы успешно вышли из аккаунта");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    console.log("darkMode:", darkMode);
    console.log("isLoggedIn:", isLoggedIn);
    console.log("showRegister:", showRegister);
  }, [darkMode, isLoggedIn, showRegister]);

  if (!isLoggedIn) {
    console.log("Rendering form, showRegister:", showRegister);
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
              login(userData);
              setSnackbarMessage("Регистрация успешна!");
              setSnackbarOpen(true);
              setShowRegister(false);
            }}
          />
        ) : (
          <LoginForm
            onLogin={(data) => {
              login(data);
              setSnackbarMessage("Вход выполнен успешно!");
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
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
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
        }}
      >
        <Header onLogout={handleLogout} />
        <Container sx={{ mt: 2 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 2 }}>
            <Paper sx={{ p: 2, backgroundColor: darkMode ? "#424242" : "#f5f5f5" }}>
              <Menu />
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: darkMode ? "#424242" : "#f5f5f5" }}>
              <Routes>
                <Route path="/" element={<Content />} />
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
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </BrowserRouter>
  );
};

export default App;