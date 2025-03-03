import { useState } from "react";
import { Container, Box, Paper } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import Content from "./components/Content";

const App = () => {
  const [selectedLab, setSelectedLab] = useState(null);

  return (
    <>
      <Header />
      <Container sx={{ mt: 2 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 2 }}>
          <Paper sx={{ p: 2 }}>
            <Menu onSelect={setSelectedLab} />
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Content selectedLab={selectedLab} />
          </Paper>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default App;
