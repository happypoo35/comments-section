import { createSlice } from "@reduxjs/toolkit";
import { api } from "app/api";

const initialState = {
  currentUser: null,
  comments: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    addReply: (state, action) => {
      const { commentId, data } = action.payload;
      const currentComment = state.comments[commentId];

      if (currentComment) {
        currentComment.replies.push(data);
      }
    },
    deleteComment: (state, action) => {
      const { commentId, replyId } = action.payload;
      const currentComment = state.comments[commentId];

      if (currentComment) {
        if (replyId === undefined) {
          state.comments.splice(commentId, 1);
        } else {
          currentComment.replies.splice(replyId, 1);
        }
      }
    },
    updateComment: (state, action) => {
      const { commentId, replyId, text, replyingTo } = action.payload;
      const currentComment = state.comments[commentId];

      if (currentComment) {
        if (replyId === undefined) {
          currentComment.content = text;
        } else {
          currentComment.replies[replyId].content = text;
          currentComment.replies[replyId].replyingTo = replyingTo;
        }
      }
    },
    increment: (state, action) => {
      const { commentId, replyId } = action.payload;
      const currentComment = state.comments[commentId];

      if (currentComment) {
        if (replyId === undefined) {
          currentComment.score += 1;
        } else {
          currentComment.replies[replyId].score += 1;
        }
      }
    },
    decrement: (state, action) => {
      const { commentId, replyId } = action.payload;
      const currentComment = state.comments[commentId];

      if (currentComment) {
        if (replyId === undefined) {
          currentComment.score -= 1;
        } else {
          currentComment.replies[replyId].score -= 1;
        }
      }
    },
    sort: (state) => {
      state.comments.sort((a, b) => b.score - a.score);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getData.matchFulfilled,
      (state, { payload }) => {
        if (!state.comments.length) {
          state.currentUser = payload.currentUser;
          state.comments = payload.comments;
        }
      }
    );
  },
});

export const selectUser = (state) => state.comments.currentUser;
export const selectComments = (state) => state.comments.comments;
export const selectLastId = (state) => {
  let id = 0;
  state.comments.comments.map((el) => {
    if (el.id > id) id = el.id;

    el.replies.map((reply) => {
      if (reply.id > id) id = reply.id;
      return id;
    });

    return id;
  });
  return id;
};

export const {
  addComment,
  addReply,
  deleteComment,
  updateComment,
  increment,
  decrement,
  sort,
} = commentsSlice.actions;

export default commentsSlice.reducer;
