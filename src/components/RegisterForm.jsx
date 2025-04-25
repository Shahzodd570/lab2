// src/components/RegisterForm.jsx
import { useForm } from "react-hook-form";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useCallback, useEffect } from "react"; // Добавляем useEffect
import { useDispatch, useSelector } from "react-redux";
import { registerUser, fetchUsers } from "../redux/userSlice";

const RegisterForm = ({ onRegister }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers()).catch((err) => {
        console.error("Ошибка при загрузке пользователей:", err);
      });
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Typography>Загрузка...</Typography>;
  }

  if (status === "failed") {
    return <Typography color="error">Ошибка: {error}</Typography>;
  }

  const onSubmit = useCallback(async (data) => {
    try {
      const userExists = users.some((user) => user.email === data.email);

      if (userExists) {
        setError("email", {
          type: "manual",
          message: "Пользователь с таким email уже зарегистрирован",
        });
        return;
      }

      const newUser = await dispatch(registerUser(data)).unwrap();
      onRegister(newUser);
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "Ошибка регистрации: " + error.message,
      });
    }
  }, [dispatch, users, onRegister, setError]);

  return (
    <Box sx={{ p: 4, maxWidth: 400, mx: "auto", border: "1px solid red" }}>
      <Typography variant="h5" gutterBottom>
        Регистрация
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Имя"
          fullWidth
          margin="normal"
          {...register("name", { required: "Имя обязательно" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email", {
            required: "Email обязателен",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Некорректный email",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Пароль"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", {
            required: "Пароль обязателен",
            minLength: {
              value: 6,
              message: "Пароль должен быть не короче 6 символов",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Зарегистрироваться
        </Button>
      </form>
    </Box>
  );
};

export default RegisterForm;