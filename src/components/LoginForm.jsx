// src/components/LoginForm.jsx
import { useForm } from "react-hook-form";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useCallback, useEffect } from "react"; // Убедимся, что useEffect импортирован
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";

const LoginForm = ({ onLogin }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const onSubmit = useCallback(async (data) => {
    try {
      const user = users.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (!user) {
        setError("email", {
          type: "manual",
          message: "Неверный email или пароль",
        });
        setError("password", {
          type: "manual",
          message: "Неверный email или пароль",
        });
        return;
      }

      onLogin(user);
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "Ошибка входа: " + error.message,
      });
    }
  }, [users, onLogin, setError]);

  return (
    <Box sx={{ p: 4, maxWidth: 400, mx: "auto", border: "1px solid red" }}>
      <Typography variant="h5" gutterBottom>
        Авторизация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", { required: "Email обязателен" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", { required: "Пароль обязателен" })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Войти
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;