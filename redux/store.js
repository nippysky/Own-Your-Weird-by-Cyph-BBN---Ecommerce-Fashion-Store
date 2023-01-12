import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "../redux/slices/bagSlice";

// The Global Store Setup
export const store = configureStore({
  reducer: {
    bag: bagReducer,
  },
});
