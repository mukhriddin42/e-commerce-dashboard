import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice.js"

export const store = configureStore({
  reducer:{
    auth: userReducer,
  }
})