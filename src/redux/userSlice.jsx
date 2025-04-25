// src/redux/userSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, createUser, updateUser } from "../api/api";

// Асинхронные действия
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const users = await getUsers();
  return users;
});

export const registerUser = createAsyncThunk("user/registerUser", async (userData) => {
  const user = await createUser(userData);
  return user;
});

export const updateUserProfile = createAsyncThunk("user/updateUserProfile", async ({ id, userData }) => {
  const updatedUser = await updateUser(id, userData);
  return updatedUser;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
        state.currentUser = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;