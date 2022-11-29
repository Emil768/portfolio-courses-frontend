import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth/auth";
import { testsReducer } from "./slices/tests/tests";

export const store = configureStore({
  reducer: {
    tests: testsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
