import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { TestProps } from "../../../propTypes";
import { TestState } from "./types";

import axios from "../../../axios";

export const fetchTests = createAsyncThunk("tests/fetchTests", async () => {
  const { data } = await axios.get("/tests");
  return data as TestProps[];
});

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
      });
  },
});

export const testsReducer = testSlice.reducer;
