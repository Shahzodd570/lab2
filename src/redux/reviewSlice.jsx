
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReviews, createReview, deleteReview } from "../api/api";

export const fetchReviews = createAsyncThunk("review/fetchReviews", async () => {
  const reviews = await getReviews();
  return reviews;
});

export const addReview = createAsyncThunk("review/addReview", async (reviewData) => {
  const review = await createReview(reviewData);
  return review;
});

export const removeReview = createAsyncThunk("review/removeReview", async (id) => {
  await deleteReview(id);
  return id;
});

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
      })
      .addCase(removeReview.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((review) => review.id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;