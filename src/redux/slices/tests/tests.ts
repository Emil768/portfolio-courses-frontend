import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { TestProps } from "../../../propTypes";
import { TestState } from "./types";

import axios from "../../../axios";

//Получить тесты
export const fetchTests = createAsyncThunk<
  TestProps[],
  void,
  { rejectValue: TestProps }
>("tests/fetchTests", async () => {
  const { data } = await axios.get("/tests");
  return data;
});

//Получение одного теста
export const fetchTest = createAsyncThunk<
  TestProps,
  string,
  { rejectValue: TestProps }
>("tests/fetchTest", async (id) => {
  const { data } = await axios.get(`/tests/${id}`);
  return data;
});

//Получить категорию
export const fetchCategory = createAsyncThunk<
  TestProps[],
  string,
  { rejectValue: TestProps }
>("tests/fetchCategory", async (title) => {
  const { data } = await axios.get(`/category/${title}`);
  return data;
});

const initialState: TestState = {
  tests: [],
  quiz: null,
  status: "loading",
};

const testSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //Все тесты

      .addCase(fetchTests.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTests.fulfilled, (state, action) => {
        state.tests = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchTests.rejected, (state) => {
        state.tests = [];
        state.status = "error";
      })

      //Один тест

      .addCase(fetchTest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTest.fulfilled, (state, action) => {
        state.quiz = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchTest.rejected, (state) => {
        state.tests = [];
        state.status = "error";
      })

      //Категории

      .addCase(fetchCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.tests = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.tests = [];
        state.status = "error";
      });
  },
});

export const testsReducer = testSlice.reducer;
