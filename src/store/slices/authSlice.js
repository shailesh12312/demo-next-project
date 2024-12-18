import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "@/utils/axiosInstance";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
};

export const loginUser  = createAsyncThunk('auth/login', async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;