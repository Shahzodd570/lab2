// src/components/About.jsx
import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const About = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
        О себе
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2, width: { xs: 40, md: 56 }, height: { xs: 40, md: 56 } }}>
              {user?.name?.charAt(0) || "U"}
            </Avatar>
            <Typography variant="h6" sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
              {user?.name || "Пользователь"}
            </Typography>
          </Box>
          <Typography variant="body1" paragraph sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
            Привет! Меня зовут {user?.name || "Пользователь"}. Это моя страница "О себе".
            Я Шахзод. Учусь в АГУ в 3 курсе.
          </Typography>
          <Typography variant="body1" paragraph sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
            Я увлекаюсь программированием.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;