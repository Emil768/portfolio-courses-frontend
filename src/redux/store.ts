import { configureStore } from "@reduxjs/toolkit";
import { testsReducer } from "./slices/tests/tests";

export const store = configureStore({
  reducer: {
    tests: testsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
