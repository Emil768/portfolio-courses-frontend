import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "@axios";
import { QuesProps, TestProps } from "@proptypes";
import { NextQuestionProps, QuizProps } from "./types";

//Получение одного теста
export const fetchTest = createAsyncThunk<
  TestProps,
  string,
  { rejectValue: TestProps }
>("tests/fetchTest", async (id) => {
  const { data } = await axios.get(`/tests/${id}`);
  return data;
});

const initialState: QuizProps = {
  quiz: null,
  currentQuesIndex: 0,
  score: 0,
  showScore: false,
  status: "loading",
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswerQuestion: (state, action) => {
      state.score += state.quiz?.ques[state.currentQuesIndex].answers[
        action.payload
      ].correct
        ? 1
        : 0;

      state.currentQuesIndex += 1;
    },

    onNextQuestion: (state) => {
      state.currentQuesIndex += 1;
    },

    onPrevQuestion: (state) => {
      state.currentQuesIndex -= 1;
    },

    setShowScore: (state) => {
      state.showScore = true;
    },
  },
  extraReducers: (builder) => {
    //Один тест
    builder
      .addCase(fetchTest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTest.fulfilled, (state, action) => {
        state.quiz = action.payload;
        state.currentQuesIndex = 0;
        state.showScore = false;
        state.score = 0;
        state.status = "loaded";
      })
      .addCase(fetchTest.rejected, (state) => {
        state.quiz = null;
        state.status = "error";
      });
  },
});

export const quizReducer = quizSlice.reducer;

export const {
  setAnswerQuestion,
  setShowScore,
  onNextQuestion,
  onPrevQuestion,
} = quizSlice.actions;
