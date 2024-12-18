import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstance";

const initialState = {
  usersLists: null,
  loading: false,
  error: null,
};

export const getUsers  = createAsyncThunk('/users', async () => {
  const response = await axiosInstance.get("/users");
  return response.data.users;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.usersLists = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersLists = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
