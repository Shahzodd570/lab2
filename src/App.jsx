// src/App.jsx
import { useState, useContext } from "react";
import { Container, Box, Paper } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Content from "./components/Content";
import { ThemeContext } from "./context/ThemeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

const App = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <Box
        sx={{
          backgroundColor: darkMode ? "black" : "white",
          color: darkMode ? "white" : "black",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Container sx={{ mt: 2 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 2 }}>
            <Paper sx={{ p: 2, backgroundColor: darkMode ? "#424242" : "#f5f5f5" }}>
              <Menu /> 
            </Paper>
            <Paper sx={{ p: 2, backgroundColor: darkMode ? "#424242" : "#f5f5f5" }}>
              <Routes>
                 {/* Для корневого пути передаем null или не передаем проп вовсе */}
                <Route path="/" element={<Content />} /> 
                 {/* Передаем числовой ID */}
                <Route path="/lab1" element={<Content selectedLabId={1} />} /> 
                <Route path="/lab2" element={<Content selectedLabId={2} />} />
                <Route path="/lab3" element={<Content selectedLabId={3} />} />
              </Routes>
            </Paper>
          </Box>
        </Container>
        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default App;