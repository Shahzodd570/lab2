// src/components/Profile.jsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import { updateUserProfile, clearError } from "../redux/userSlice";
import useLoginState from "../hooks/useLoginState";

const Profile = () => {
  const user = useSelector((state) => state.user.currentUser);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const { login } = useLoginState();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    console.log("Profile.jsx: user =", user);
    console.log("Profile.jsx: name =", name);
    console.log("Profile.jsx: email =", email);
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      setSnackbarOpen(true);
    }
  }, [error]);

  const handleSave = async () => {
    if (!user) {
      console.error("Profile.jsx: Пользователь не авторизован, user =", user);
      return;
    }
    try {
      const updatedUser = { ...user, name, email };
      await dispatch(updateUserProfile({ id: user.id, userData: updatedUser })).unwrap();
      login(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    dispatch(clearError());
  };

  if (!user) {
    return (
      <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 600, mx: "auto" }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
          Профиль
        </Typography>
        <Typography variant="body1" color="error" sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}>
          Пожалуйста, войдите в аккаунт, чтобы просмотреть профиль.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
        Профиль
      </Typography>
      <Card>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar sx={{ bgcolor: "primary.main", mr: 2, width: { xs: 40, md: 56 }, height: { xs: 40, md: 56 } }}>
              {name ? name.charAt(0) : "U"}
            </Avatar>
            <Typography variant="h5" sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
              {name || "Пользователь"}
            </Typography>
          </Box>
          {editMode ? (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  InputProps={{ style: { fontSize: { xs: "0.875rem", md: "1rem" } } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  variant="outlined"
                  InputProps={{ style: { fontSize: { xs: "0.875rem", md: "1rem" } } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  sx={{ mr: 1, fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                >
                  Сохранить
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setName(user?.name || "");
                    setEmail(user?.email || "");
                    setEditMode(false);
                  }}
                  sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
                >
                  Отмена
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Box>
              <Typography
                variant="body1"
                paragraph
                sx={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
              >
                <strong>Email:</strong> {email || "Не указан"}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setEditMode(true)}
                sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
              >
                Редактировать
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;