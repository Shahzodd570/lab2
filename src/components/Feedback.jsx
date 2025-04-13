// src/components/Feedback.jsx
import { useForm } from "react-hook-form";
import { Box, Typography, TextField, Button, List, ListItem } from "@mui/material";
import { useState, useCallback } from "react";

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = useCallback((data) => {
    setReviews((prev) => [...prev, data]);
    reset();
  }, [reset]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Форма обратной связи</Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Имя"
          fullWidth
          margin="normal"
          {...register("name", { required: "Введите имя" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Сообщение"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          {...register("message", { required: "Введите сообщение" })}
          error={!!errors.message}
          helperText={errors.message?.message}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Отправить</Button>
      </form>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1">Отзывы:</Typography>
        <List>
          {reviews.map((item, index) => (
            <ListItem key={index}>
              <strong>{item.name}:</strong>&nbsp;{item.message}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Feedback;
