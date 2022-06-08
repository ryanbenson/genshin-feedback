import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import feedbackReducer from "../features/feedback/feedbackSlice";
import feedbackLikeReducer from "../features/feedback/feedbackLikeSlice";
import feedbackSaveReducer from "../features/feedback/feedbackSaveSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    feedback: feedbackReducer,
    feedbackLike: feedbackLikeReducer,
    feedbackSave: feedbackSaveReducer,
  },
});
