// src/components/Feedback.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchReviews, removeReview } from "../redux/reviewSlice";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Feedback = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.review.reviews);
  const status = useSelector((state) => state.review.status);
  const error = useSelector((state) => state.review.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchReviews());
    }
  }, [status, dispatch]);

  const handleDeleteReview = async (id) => {
    try {
      await dispatch(removeReview(id)).unwrap();
    } catch (error) {
      console.error("Ошибка при удалении отзыва:", error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: "1.1rem", md: "1.25rem" } }}>
        Отзывы
      </Typography>
      {status === "loading" ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : status === "failed" ? (
        <Typography variant="body2" color="error">
          Ошибка загрузки отзывов: {error}
        </Typography>
      ) : reviews.length > 0 ? (
        <List>
          {reviews.map((review) => (
            <ListItem
              key={review.id}
              sx={{ flexDirection: "column", alignItems: "flex-start" }}
              secondaryAction={
                <IconButton edge="end" onClick={() => handleDeleteReview(review.id)}>
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={review.text}
                secondary={new Date(review.date).toLocaleString()}
                primaryTypographyProps={{ fontSize: { xs: "0.875rem", md: "1rem" } }}
                secondaryTypographyProps={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Пока нет отзывов.
        </Typography>
      )}
    </Box>
  );
};

export default Feedback;