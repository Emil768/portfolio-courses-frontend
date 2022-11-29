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

//Удалить тест
export const fetchRemoveTest = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("tests/fetchRemoveTest", async (id) => await axios.delete(`/tests/${id}`));

const initialState: TestState = {
  tests: [],
  status: "loading",
};

const testSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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

      //Удаление

      .addCase(fetchRemoveTest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRemoveTest.fulfilled, (state, action) => {
        state.tests = state.tests.filter(
          (test) => test._id !== action.meta.arg
        );
        state.status = "loaded";
      })
      .addCase(fetchRemoveTest.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const testsReducer = testSlice.reducer;
