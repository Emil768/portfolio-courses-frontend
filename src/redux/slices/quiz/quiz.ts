import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@axios";
import { CommentProps, TestProps } from "@proptypes";
import { CommentPropsQuery, QuizProps } from "./types";

//Получение одного теста
export const fetchTest = createAsyncThunk<
  TestProps,
  string,
  { rejectValue: TestProps }
>("quiz/fetchTest", async (id) => {
  const { data } = await axios.get(`/tests/${id}`);
  return data;
});

//Создание комментария
export const fetchAddComment = createAsyncThunk<
  CommentPropsQuery,
  CommentPropsQuery,
  { rejectValue: CommentPropsQuery }
>("quiz/fetchAddComment", async ({ text, testId }) => {
  const { data } = await axios.post(`/comments`, { text, testId });
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
    getAllComments: (state) => {
      state.quiz?.comments.filter((item) => item);
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
      })

      //Add comment

      .addCase(fetchAddComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddComment.fulfilled, (state, action) => {
        state.quiz?.comments.push(action.payload);
        state.status = "loaded";
      })
      .addCase(fetchAddComment.rejected, (state) => {
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
  getAllComments,
} = quizSlice.actions;
