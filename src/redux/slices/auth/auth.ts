import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { AvatarProps, UserProps } from "../../../propTypes";

import axios from "../../../axios";
import { AuthState } from "./types";
import { LoginProps } from "../../../propTypes/authProps";

export const fetchAuth = createAsyncThunk<
  UserProps,
  LoginProps,
  { rejectValue: UserProps }
>("auth/fetchAuth", async (params) => {
  const { data } = await axios.post("/auth/login", params);

  return data;
});

//Регистрация
export const fethAuthRegister = createAsyncThunk<
  UserProps,
  UserProps,
  { rejectValue: UserProps }
>("auth/fetchAuthRegister", async (params) => {
  const { data } = await axios.post("/auth/register", params);
  return data as UserProps;
});

//Загрузка аватарки
export const fethAuthUpload = createAsyncThunk(
  "auth/fethAuthUpload",
  async (params: object) => {
    const { data } = await axios.post("/uploads", params);
    return data;
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
    //login

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

    //register

    builder
      .addCase(fethAuthRegister.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fethAuthRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fethAuthRegister.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });

    //upload

    builder
      .addCase(fethAuthUpload.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fethAuthUpload.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fethAuthUpload.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

// export const selectIsAuth = (state:AuthState)=>Boolean(state.data)

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
