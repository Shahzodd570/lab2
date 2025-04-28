// src/redux/userSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, createUser, updateUser } from "../api/api";

// Асинхронные действия
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const users = await getUsers();
  return users;
});

export const registerUser = createAsyncThunk("user/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const user = await createUser(userData);
    return user;
  } catch (error) {
    return rejectWithValue(error.response?.data || "Ошибка регистрации");
  }
});

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const updatedUser = await updateUser(id, userData);
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка обновления профиля");
    }
  }
);

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
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUsers
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
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // updateUserProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.users = state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        );
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { login, logout, clearError } = userSlice.actions;
export default userSlice.reducer;