// src/components/Header.jsx
import { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContext } from "../context/ThemeContext";
import useLoginState from "../hooks/useLoginState";
import { NavLink } from "react-router-dom";

const Header = ({ onLogout }) => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { user } = useLoginState();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navItems = [
    { text: "Главная", path: "/" },
    { text: "О себе", path: "/about" },
    { text: "Профиль", path: "/profile" },
  ];

  const labs = [
    { id: 1, title: "Лабораторная работа 1", path: "/lab1" },
    { id: 2, title: "Лабораторная работа 2", path: "/lab2" },
    { id: 3, title: "Лабораторная работа 3", path: "/lab3" },
    { id: 4, title: "Профиль", path: "/profile" },
  ];

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawerContent = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" sx={{ p: 2, color: darkMode ? "white" : "black" }}>
        Лабораторные работы
      </Typography>
      <List>
        {labs.map((lab) => (
          <ListItem
            key={lab.id}
            component={NavLink}
            to={lab.path}
            onClick={handleDrawerToggle}
            sx={{ color: darkMode ? "white" : "black" }}
          >
            <ListItemText primary={lab.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Кнопка меню видна на всех размерах экрана */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Лабораторные работы
        </Typography>

        {/* Навигация для больших экранов */}
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          {navItems.map((item) => (
            <Button
              key={item.text}
              color="inherit"
              component={NavLink}
              to={item.path}
              sx={{
                mx: 1,
                "&.active": { fontWeight: "bold", borderBottom: "2px solid white" },
              }}
            >
              {item.text}
            </Button>
          ))}
          <Typography variant="body1" sx={{ mr: 2 }}>
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
        </Box>

        {/* Навигация для маленьких экранов в тулбаре */}
        <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
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
        </Box>
      </Toolbar>

      {/* Drawer с лабораторными работами */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Header;