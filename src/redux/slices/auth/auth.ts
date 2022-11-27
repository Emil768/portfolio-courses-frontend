import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { UserProps } from "../../../propTypes";

import axios from "../../../axios";
import { AuthState } from "./types";
import { LoginProps } from "../../../propTypes/authProps";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: LoginProps) => {
    const { data } = await axios.post("/auth/login", params);
    return data as UserProps;
  }
);

const initialState: AuthState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

// export const selectIsAuth = (state:AuthState)=>Boolean(state.data)

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
