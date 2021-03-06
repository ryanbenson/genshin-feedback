import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createFeedbackLike, deleteFeedbackLike } from "./feedbackSaveAPI";

const initialState = {
  likes: {},
  isLoading: false,
};

export const postFeedbackLikeAsync = createAsyncThunk(
  "feedbackLike/post",
  async (content) => {
    const response = await createFeedbackLike(content);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteFeedbackLikeAsync = createAsyncThunk(
  "feedbackLike/delete",
  async (content) => {
    const response = await deleteFeedbackLike(content);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const feedbackLikeSlice = createSlice({
  name: "feedbackLike",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(postFeedbackLikeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postFeedbackLikeAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.likes[action.payload.id] = true;
      })
      .addCase(deleteFeedbackLikeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFeedbackLikeAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        delete state.likes[action.payload.id];
      });
  },
});

// export const { increment, decrement, incrementByAmount } =
//   feedbackSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLikes = (state) => state.likes;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default feedbackLikeSlice.reducer;
