import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: "idle",
  data: [],
  error: false,
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    questionsLoading(state) {
      if (state.loading === "idle") {
        state.loading = "pending";
        state.error = false;
      }
    },
    questionsError(state) {
      state.loading = "pending";
      state.error = true;
    },
    questionsReceived(state, action) {
      if (state.loading === "pending") {
        state.loading = "idle";
        state.data = action.payload;
        state.error = false;
      }
    },
    answersReceived(state, action) {
      const aux = [...state.data]
      const index = aux.findIndex(f => f.question === action.payload.question);
      if (index > -1) {
        aux[index].answer = action.payload.answer;
        aux[index].correct = action.payload.answer == aux[index].correct_answer;
      }
      state.data = aux;
    },
  },
});

export const {
  questionsLoading,
  questionsReceived,
  questionsError,
  answersReceived,
} = questionsSlice.actions;

export default questionsSlice.reducer;
