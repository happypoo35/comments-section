import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../features/appSlice";
import { api } from "./api";
import { throttle } from "lodash";
import { loadState, saveState } from "./localStorage";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    global: appReducer,
  },
  preloadedState: loadState(),
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

store.subscribe(
  throttle(() => {
    saveState({ global: store.getState().global });
  }, 1000)
);
