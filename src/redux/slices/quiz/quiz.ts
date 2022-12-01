import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  score: null,
  currentQuestionIndex: null,
  answers: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
});

export const quizReducer = quizSlice.reducer;
