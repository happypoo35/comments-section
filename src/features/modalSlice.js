import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: false, commentId: null, replyId: null };

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      const { commentId, replyId } = action.payload;
      state.value = true;
      state.commentId = commentId;
      state.replyId = replyId;
    },
    closeModal: (state) => {
      return initialState;
    },
  },
});

export const selectModal = (state) => state.modal;

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
