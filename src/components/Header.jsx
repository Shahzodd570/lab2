// src/components/Header.jsx
import { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import useLoginState from "../hooks/useLoginState";

const Header = ({ onLogout }) => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user, login } = useLoginState();
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");

  // Обновляем newName, если user меняется
  useState(() => {
    setNewName(user?.name || "");
  }, [user]);

  const handleUpdateProfile = () => {
    if (!user) return;

    const updatedUser = { ...user, name: newName };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    login(updatedUser);
    setOpen(false);
  };

  const handleOpenDialog = () => {
    if (user) {
      setOpen(true);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Лабораторные работы
        </Typography>
        <Typography
          variant="body1"
          sx={{ mr: 2, cursor: user ? "pointer" : "default" }}
          onClick={handleOpenDialog}
        >
          {user?.name || user?.email || "Гость"}
        </Typography>
        {user && (
          <Button color="inherit" onClick={onLogout} sx={{ mr: 1 }}>
            Выйти
          </Button>
        )}
        <IconButton color="inherit" onClick={toggleTheme}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Редактировать профиль</DialogTitle>
        <DialogContent>
          <TextField
            label="Имя"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="body2">
            Email: {user?.email || "Не указан"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Отмена</Button>
          <Button onClick={handleUpdateProfile} variant="contained">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default Header;