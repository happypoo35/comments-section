import { createSlice } from "@reduxjs/toolkit";
import { api } from "../app/api";

const initialState = {
  currentUser: null,
  comments: [],
};

export const appSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getData.matchFulfilled,
      (state, { payload }) => {
        state.currentUser = payload.currentUser;
        state.comments = payload.comments;
      }
    );
  },
});

export const selectUser = (state) => state.global.currentUser;
export const selectComments = (state) => state.global.comments;

export default appSlice.reducer;
