// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import userReducer from "./userSlice";
import reviewReducer from "./reviewSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    review: reviewReducer,
  },
});