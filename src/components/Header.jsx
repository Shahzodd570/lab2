// src/components/Header.jsx
import { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { ThemeContext } from "../context/ThemeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import useLoginState from "../hooks/useLoginState";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../redux/userSlice";

const Header = ({ onLogout }) => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user, login } = useLoginState();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");

  const handleUpdateProfile = async () => {
    if (!user) return;

    try {
      const updatedUser = { ...user, name: newName };
      await dispatch(updateUserProfile({ id: user.id, userData: updatedUser })).unwrap();
      login(updatedUser);
      setOpen(false);
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
    }
  };

  const handleOpenDialog = () => {
    if (user) {
      setNewName(user.name || "");
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