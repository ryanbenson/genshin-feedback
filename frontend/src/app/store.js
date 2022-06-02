import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import feedbackReducer from "../features/feedback/feedbackSlice";
import feedbackLikeReducer from "../features/feedback/feedbackLikeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    feedback: feedbackReducer,
    feedbackLike: feedbackLikeReducer,
  },
});
