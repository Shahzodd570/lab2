// src/components/Feedback.jsx
import { useForm } from "react-hook-form";
import { Box, Typography, TextField, Button, List, ListItem, IconButton } from "@mui/material";
import { useCallback, useEffect } from "react"; // Убедимся, что useEffect импортирован
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews, addReview, removeReview } from "../redux/reviewSlice";

const Feedback = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { reviews, status } = useSelector((state) => state.review);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchReviews());
    }
  }, [dispatch, status]);

  const onSubmit = useCallback(async (data) => {
    try {
      await dispatch(addReview(data)).unwrap();
      reset();
    } catch (error) {
      console.error("Ошибка отправки отзыва:", error);
    }
  }, [dispatch, reset]);

  const handleDeleteReview = async (id) => {
    try {
      await dispatch(removeReview(id)).unwrap();
    } catch (error) {
      console.error("Ошибка удаления отзыва:", error);
    }
  };

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
          {reviews.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDeleteReview(item.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <strong>{item.name}:</strong> {item.message}
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Feedback;