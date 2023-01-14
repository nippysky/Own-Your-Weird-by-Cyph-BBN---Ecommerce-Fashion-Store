import { configureStore } from "@reduxjs/toolkit";
import bagReducer from "../redux/slices/bagSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  bag: bagReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

// The Global Store Setup
export const store = configureStore({
  reducer: persistedReducer,
});
