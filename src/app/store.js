import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "features/commentsSlice";
import modalReducer from "features/modalSlice";
import { api } from "./api";
import { throttle } from "lodash";
import { loadState, saveState } from "./localStorage";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    comments: commentsReducer,
    modal: modalReducer,
  },
  preloadedState: loadState(),
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

store.subscribe(
  throttle(() => {
    saveState({ comments: store.getState().comments });
  }, 1000)
);
