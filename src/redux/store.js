import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; // путь укажи правильный

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
