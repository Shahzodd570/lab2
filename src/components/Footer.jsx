// src/components/Footer.jsx
import { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";
import InfoIcon from "@mui/icons-material/Info";
import { useDispatch, useSelector } from "react-redux";
import { addReview } from "../redux/reviewSlice";

const Footer = () => {
  const dispatch = useDispatch();
  const reviewStatus = useSelector((state) => state.review.status);
  const reviewError = useSelector((state) => state.review.error);
  const [value, setValue] = useState(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleFeedbackSubmit = async () => {
    if (feedbackText.trim()) {
      try {
        await dispatch(addReview({ text: feedbackText, date: new Date().toISOString() })).unwrap();
        setFeedbackText("");
        setFeedbackOpen(false);
        setSnackbarMessage("Отзыв успешно отправлен!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        setSnackbarMessage(reviewError || "Ошибка при отправке отзыва");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ width: "100%", mt: "auto" }}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        showLabels
        sx={{ backgroundColor: "#1976d2", color: "white" }}
      >
        <BottomNavigationAction
          label="Обратная связь"
          icon={<FeedbackIcon />}
          onClick={() => setFeedbackOpen(true)}
          sx={{ color: "white" }}
        />
        <BottomNavigationAction
          label="О приложении"
          icon={<InfoIcon />}
          onClick={() => alert("Это приложение для лабораторных работ!")}
          sx={{ color: "white" }}
        />
      </BottomNavigation>

      <Dialog open={feedbackOpen} onClose={() => setFeedbackOpen(false)}>
        <DialogTitle>Обратная связь</DialogTitle>
        <DialogContent>
          <TextField
            label="Ваш отзыв"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackOpen(false)}>Отмена</Button>
          <Button
            onClick={handleFeedbackSubmit}
            variant="contained"
            disabled={!feedbackText.trim() || reviewStatus === "loading"}
          >
            {reviewStatus === "loading" ? "Отправка..." : "Отправить"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 1 }}>
        © 2025 Лабораторные работы
      </Typography>
    </Box>
  );
};

export default Footer;