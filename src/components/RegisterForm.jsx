// src/components/RegisterForm.jsx
import { useForm } from "react-hook-form";
import { Box, TextField, Button, Typography } from "@mui/material";

const RegisterForm = ({ onRegister }) => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = (data) => {
    // Проверяем, есть ли пользователь с таким email в localStorage
    const existingUser = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUser.some((user) => user.email === data.email);

    if (userExists) {
      setError("email", {
        type: "manual",
        message: "Пользователь с таким email уже зарегистрирован",
      });
      return;
    }

    // Если пользователя нет, добавляем его в "базу"
    const updatedUsers = [...existingUser, data];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    console.log("Данные регистрации:", data);
    onRegister(data); // Логиним пользователя
  };

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