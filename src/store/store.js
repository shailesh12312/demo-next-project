"use client";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "@/store/slices/authSlice";
import usersSlice from "@/store/slices/usersSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
  },
});

export default store;